import { useState, useEffect } from 'react';
import { X, ExternalLink, Github, Terminal, Cpu, Network, FileText, Check, Copy } from 'lucide-react';

function getYouTubeEmbedUrl(url) {
    if (!url) return null;
    let videoId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        videoId = match[2];
    } else {
        return null;
    }
    return `https://www.youtube.com/embed/${videoId}`;
}

export default function ProjectDrawer({ project, detail, onClose }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [activeEndpointIdx, setActiveEndpointIdx] = useState(0);
    const [copiedText, setCopiedText] = useState(false);
    const [activeLang, setActiveLang] = useState('curl');

    useEffect(() => {
        // Reset tabs when project changes
        setActiveTab('overview');
        setActiveEndpointIdx(0);
    }, [project]);

    // Handle ESC key press to close drawer
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!project || !detail) return null;

    const hasApi = detail.endpoints && detail.endpoints.length > 0;
    const embedUrl = getYouTubeEmbedUrl(project.demo);

    // Get code snippet template based on language
    const getCodeSnippet = (endpoint, lang) => {
        if (!endpoint) return '';
        const url = `https://api.maxwellnyimbili.dev${endpoint.path}`;
        if (lang === 'javascript') {
            const hasBody = endpoint.method !== 'GET';
            return `fetch('${url}', {
  method: '${endpoint.method}',
  headers: {
    ${Object.entries(endpoint.headers || {}).map(([k, v]) => `'${k}': '${v}'`).join(',\n    ')}
  }${hasBody ? `,\n  body: JSON.stringify(${endpoint.requestBody})` : ''}
})
  .then(res => res.json())
  .then(data => console.log(data));`;
        }
        if (lang === 'python') {
            const hasBody = endpoint.method !== 'GET';
            return `import requests

url = '${url}'
headers = {
    ${Object.entries(endpoint.headers || {}).map(([k, v]) => `'${k}': '${v}'`).join(',\n    ')}
}
${hasBody ? `payload = ${endpoint.requestBody.replace(/\/\/ .*/g, '')}\nresponse = requests.post(url, json=payload, headers=headers)` : `response = requests.get(url, headers=headers)`}

print(response.json())`;
        }
        // default curl
        const hasHeaders = endpoint.headers && Object.keys(endpoint.headers).length > 0;
        const headerStr = hasHeaders ? Object.entries(endpoint.headers).map(([k, v]) => ` -H "${k}: ${v}"`).join('') : '';
        const hasBody = endpoint.method !== 'GET' && endpoint.requestBody !== 'None';
        const bodyStr = hasBody ? ` -d '${endpoint.requestBody.replace(/\n/g, ' ')}'` : '';
        return `curl -X ${endpoint.method} "${url}"${headerStr}${bodyStr}`;
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedText(true);
        setTimeout(() => setCopiedText(false), 2000);
    };

    return (
        <>
            {/* Backdrop */}
            <div className="drawer-backdrop" onClick={onClose} />

            {/* Panel */}
            <div className="drawer-panel" role="dialog" aria-modal="true">
                {/* Header */}
                <div className="drawer-header">
                    <div>
                        <span className="drawer-category">{project.tech.split(' · ')[0]}</span>
                        <h2>{project.title}</h2>
                        <p className="drawer-tagline">{detail.tagline}</p>
                    </div>
                    <button className="drawer-close" onClick={onClose} aria-label="Close drawer">
                        <X size={20} />
                    </button>
                </div>

                {/* Primary Actions */}
                <div className="drawer-actions">
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="drawer-action-btn">
                            <Github size={16} /> GITHUB REPO ↗
                        </a>
                    )}
                    {project.demo && !embedUrl && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="drawer-action-btn primary">
                            <ExternalLink size={16} /> LIVE DEMO ↗
                        </a>
                    )}
                </div>

                {/* Tabs Navigator */}
                <div className="drawer-tabs">
                    <button 
                        className={`drawer-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <FileText size={14} /> OVERVIEW
                    </button>
                    <button 
                        className={`drawer-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
                        onClick={() => setActiveTab('architecture')}
                    >
                        <Cpu size={14} /> ARCHITECTURE
                    </button>
                    {hasApi && (
                        <>
                            <button 
                                className={`drawer-tab-btn ${activeTab === 'api' ? 'active' : ''}`}
                                onClick={() => setActiveTab('api')}
                            >
                                <Terminal size={14} /> API ENDPOINTS
                            </button>
                            <button 
                                className={`drawer-tab-btn ${activeTab === 'openapi' ? 'active' : ''}`}
                                onClick={() => setActiveTab('openapi')}
                            >
                                <Network size={14} /> OPENAPI SPEC
                            </button>
                        </>
                    )}
                </div>

                {/* Content Area */}
                <div className="drawer-content">
                    
                    {/* TAB: OVERVIEW */}
                    {activeTab === 'overview' && (
                        <div className="tab-pane">
                            <div className="drawer-image-wrapper">
                                <img src={project.img} alt={project.title} className="drawer-cover-img" />
                            </div>

                            <div className="overview-text">
                                <h3>Project Context</h3>
                                <p>{project.desc}</p>

                                {embedUrl && (
                                    <div className="video-section">
                                        <h3 className="specs-title">Video Walkthrough</h3>
                                        <div className="video-container">
                                            <iframe 
                                                src={embedUrl}
                                                title={`${project.title} Demo Video`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                )}
                                
                                <h3 className="specs-title">Technical Stack</h3>
                                <div className="tech-pills">
                                    {project.tech.split(' · ').map(t => (
                                        <span key={t} className="tech-pill">{t}</span>
                                    ))}
                                </div>

                                <h3 className="specs-title">Core Implementation Details</h3>
                                <p className="implementation-text">
                                    This solution addresses software lifecycle reliability and performance. Under strict criteria, the application implements scalable modular routines. This provides recruiters with verification of Maxwell&apos;s development standards.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* TAB: ARCHITECTURE */}
                    {activeTab === 'architecture' && (
                        <div className="tab-pane">
                            <div className="architecture-narrative">
                                <h3>Data Flow & System Topology</h3>
                                <p>{detail.architecture.description}</p>
                            </div>

                            <div className="architecture-flow">
                                {detail.architecture.nodes.map((node, idx) => (
                                    <div key={node.id} className="arch-flow-step">
                                        <div className="arch-card">
                                            <div className="arch-card-header">
                                                <span className="arch-node-layer">{node.layer}</span>
                                                <h4>{node.label}</h4>
                                            </div>
                                            <p className="arch-node-desc">{node.desc}</p>
                                        </div>
                                        {idx < detail.architecture.nodes.map.length - 1 && (
                                            <div className="arch-arrow">
                                                <div className="arch-arrow-line"></div>
                                                <div className="arch-arrow-head">↓</div>
                                                {detail.architecture.connections[idx] && (
                                                    <span className="arch-arrow-label">
                                                        {detail.architecture.connections[idx].type}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB: API ENDPOINTS */}
                    {activeTab === 'api' && hasApi && (
                        <div className="tab-pane api-pane">
                            <div className="api-layout">
                                {/* Route Sidebar */}
                                <div className="api-sidebar">
                                    {detail.endpoints.map((ep, idx) => (
                                        <button 
                                            key={`${ep.method}-${ep.path}`}
                                            className={`api-route-btn ${activeEndpointIdx === idx ? 'active' : ''}`}
                                            onClick={() => setActiveEndpointIdx(idx)}
                                        >
                                            <span className={`method-badge ${ep.method.toLowerCase()}`}>{ep.method}</span>
                                            <span className="path-label">{ep.path}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Endpoint Details */}
                                <div className="api-details">
                                    {(() => {
                                        const ep = detail.endpoints[activeEndpointIdx];
                                        if (!ep) return null;
                                        return (
                                            <>
                                                <h4>{ep.method} {ep.path}</h4>
                                                <p className="endpoint-desc">{ep.description}</p>

                                                {ep.params && ep.params.length > 0 && (
                                                    <div className="endpoint-params-sec">
                                                        <h5>Parameters</h5>
                                                        <table className="params-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>Type</th>
                                                                    <th>Required</th>
                                                                    <th>Description</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {ep.params.map(p => (
                                                                    <tr key={p.name}>
                                                                        <td className="param-name">{p.name}</td>
                                                                        <td className="param-type">{p.type}</td>
                                                                        <td className="param-req">{p.required ? 'Yes' : 'No'}</td>
                                                                        <td className="param-desc">{p.desc}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}

                                                <div className="code-snippet-header">
                                                    <h5>Request Code Snippet</h5>
                                                    <div className="lang-switcher">
                                                        {['curl', 'javascript', 'python'].map(l => (
                                                            <button 
                                                                key={l}
                                                                className={`lang-btn ${activeLang === l ? 'active' : ''}`}
                                                                onClick={() => setActiveLang(l)}
                                                            >
                                                                {l.toUpperCase()}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="code-block-container">
                                                    <button 
                                                        className="copy-btn" 
                                                        onClick={() => handleCopy(getCodeSnippet(ep, activeLang))}
                                                        title="Copy code"
                                                    >
                                                        {copiedText ? <Check size={14} /> : <Copy size={14} />}
                                                    </button>
                                                    <pre>
                                                        <code>{getCodeSnippet(ep, activeLang)}</code>
                                                    </pre>
                                                </div>

                                                {ep.requestBody !== 'None' && (
                                                    <>
                                                        <h5>Request Payload</h5>
                                                        <div className="code-block-container">
                                                            <pre>
                                                                <code>{ep.requestBody}</code>
                                                            </pre>
                                                        </div>
                                                    </>
                                                )}

                                                <h5>Response Payload (JSON)</h5>
                                                <div className="code-block-container">
                                                    <pre>
                                                        <code>{ep.responseBody}</code>
                                                    </pre>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: OPENAPI SPEC */}
                    {activeTab === 'openapi' && hasApi && detail.openapi && (
                        <div className="tab-pane">
                            <h3>OpenAPI Schema Registry</h3>
                            <p className="openapi-desc">Below is the metadata JSON schema representation of the API contract registry.</p>
                            
                            <div className="code-block-container">
                                <button 
                                    className="copy-btn" 
                                    onClick={() => handleCopy(JSON.stringify(detail.openapi, null, 4))}
                                    title="Copy OpenAPI spec"
                                >
                                    {copiedText ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                                <pre>
                                    <code>{JSON.stringify(detail.openapi, null, 4)}</code>
                                </pre>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}
