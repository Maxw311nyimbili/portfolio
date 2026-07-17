export const PROJECTS_DETAIL = {
    'Vantage FotoFinder': {
        title: 'Vantage FotoFinder',
        tagline: 'Semantic product search using dense vector embeddings',
        category: 'AI Engineering',
        desc: 'CLIP and FAISS semantic image search. Upload an image, find visually similar products from any catalog.',
        architecture: {
            description: 'The user uploads an image. The FastAPI backend processes the image through OpenAI CLIP ViT-B/32 to generate a 512-dimensional vector embedding. This embedding is passed to a FAISS index to run a nearest-neighbor index search. Visual matches are returned with similarity scores.',
            nodes: [
                { id: 'client', label: 'Next.js Client', layer: 'Frontend', desc: 'Handles image upload and showcases similarity grids.' },
                { id: 'api', label: 'FastAPI Gateway', layer: 'Backend Service', desc: 'Receives request, handles validation and formatting.' },
                { id: 'clip', label: 'CLIP Service (PyTorch)', layer: 'Inference Model', desc: 'Encodes images or text into normalized 512-dimensional vectors.' },
                { id: 'faiss', label: 'FAISS Vector Index', layer: 'Index Store', desc: 'Runs Cosine Similarity nearest-neighbor search in under 10ms.' },
                { id: 'db', label: 'Catalog DB', layer: 'Database', desc: 'Stores product metadata and references.' }
            ],
            connections: [
                { from: 'client', to: 'api', type: 'HTTP POST (multipart)' },
                { from: 'api', to: 'clip', type: 'Tensor request' },
                { from: 'clip', to: 'faiss', type: 'Query vector' },
                { from: 'faiss', to: 'db', type: 'Match IDs' },
                { from: 'db', to: 'api', type: 'Metadata mapping' },
                { from: 'api', to: 'client', type: 'JSON response' }
            ]
        },
        endpoints: [
            {
                method: 'POST',
                path: '/api/v1/search',
                description: 'Search visual catalog using visual similarities from an uploaded query image.',
                headers: { 'Content-Type': 'multipart/form-data' },
                params: [
                    { name: 'query_image', type: 'File (Binary)', required: true, desc: 'Image file (PNG/JPG) to run search query.' },
                    { name: 'top_k', type: 'Integer', required: false, desc: 'Number of closest matches to retrieve (default is 10).' }
                ],
                requestBody: '// Form Data\n// key: query_image\n// value: [binary_payload]',
                responseBody: JSON.stringify([
                    {
                        product_id: 'prod_9082',
                        name: 'Minimalist Leather Boots',
                        similarity_score: 0.9482,
                        image_url: '/images/p2.png',
                        in_stock: true
                    },
                    {
                        product_id: 'prod_1289',
                        name: 'Suede Chukka Boots',
                        similarity_score: 0.8841,
                        image_url: '/images/p2.png',
                        in_stock: true
                    }
                ], null, 2)
            },
            {
                method: 'GET',
                path: '/api/v1/index/status',
                description: 'Retrieve vector index size, model device parameters, and active configuration stats.',
                headers: { 'Accept': 'application/json' },
                params: [],
                requestBody: 'None',
                responseBody: JSON.stringify({
                    status: 'operational',
                    index_type: 'FAISS_IndexFlatIP',
                    total_vectors: 14820,
                    vector_dimensions: 512,
                    device: 'cuda:0',
                    last_built: '2026-07-01T10:15:00Z'
                }, null, 2)
            }
        ],
        openapi: {
            openapi: '3.0.0',
            info: {
                title: 'FotoFinder Vector Search API',
                version: '1.0.0',
                description: 'Vector-similarity product search API.'
            },
            paths: {
                '/api/v1/search': {
                    post: {
                        summary: 'Vector Search by Image',
                        parameters: [{ name: 'top_k', in: 'query', schema: { type: 'integer' } }],
                        responses: {
                            '200': {
                                description: 'List of matching items ordered by distance.',
                                content: { 'application/json': { schema: { type: 'array' } } }
                            }
                        }
                    }
                }
            }
        }
    },
    'Paper Summary': {
        title: 'Paper Summary',
        tagline: 'Deconstruct research papers with Llama-3 and Groq in seconds',
        category: 'AI Engineering',
        desc: '45 min of reading to 10 second synthesis. Research papers deconstructed by llama-3.3-70b on Groq.',
        architecture: {
            description: 'PDF documents are uploaded. PyPDF extracts the raw document text. The text is divided into overlapping chunks. FastAPI creates a prompt layout injecting the text chunks and targets Groq API using the Llama-3.3-70B model to extract structured metadata (Summary, Methodology, Key Findings, Limitations). The result is parsed and displayed in Next.js.',
            nodes: [
                { id: 'client', label: 'Next.js Frontend', layer: 'Frontend', desc: 'Displays reading charts, structured summary panels.' },
                { id: 'api', label: 'FastAPI Service', layer: 'Backend Service', desc: 'Manages text chunking, payload routing, prompts.' },
                { id: 'parser', label: 'PyPDF Engine', layer: 'File Parsing', desc: 'Parses PDF binary stream and retrieves raw text.' },
                { id: 'groq', label: 'Groq Cloud API', layer: 'Inference Engine', desc: 'Accesses Llama-3.3-70B model on ultra-low latency LPUs.' }
            ],
            connections: [
                { from: 'client', to: 'api', type: 'HTTP POST (PDF file)' },
                { from: 'api', to: 'parser', type: 'Binary stream' },
                { from: 'parser', to: 'api', type: 'Extracted text blocks' },
                { from: 'api', to: 'groq', type: 'Prompt with text payload' },
                { from: 'groq', to: 'api', type: 'Structured JSON string' },
                { from: 'api', to: 'client', type: 'Parsed React state JSON' }
            ]
        },
        endpoints: [
            {
                method: 'POST',
                path: '/api/v1/summarize',
                description: 'Process PDF and generate a structured JSON synthesis.',
                headers: { 'Content-Type': 'multipart/form-data' },
                params: [
                    { name: 'file', type: 'File (PDF)', required: true, desc: 'Research paper in PDF format.' },
                    { name: 'mode', type: 'String', required: false, desc: 'Style of summary: standard, detailed, bulleted.' }
                ],
                requestBody: '// Form Data\n// key: file\n// value: [research_paper.pdf]',
                responseBody: JSON.stringify({
                    paper_metadata: {
                        title: 'Attention Is All You Need',
                        authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar'],
                        published_year: 2017
                    },
                    synthesis: {
                        one_sentence: 'Introduced the Transformer network based solely on self-attention mechanisms, replacing recurrence and convolutions.',
                        methodology: 'Self-Attention layers, Multi-Head attention mechanism, and sinusoidal position encoding.',
                        key_findings: [
                            'Achieved 28.4 BLEU on WMT 2014 English-to-German translation task.',
                            'Significantly faster training speeds compared to RNN/LSTM sequences.'
                        ],
                        limitations: [
                            'Quadratic memory complexity O(N^2) relative to sequence length N.'
                        ]
                    }
                }, null, 2)
            }
        ],
        openapi: {
            openapi: '3.0.0',
            info: {
                title: 'Paper Summarizer API',
                version: '1.0.0'
            },
            paths: {
                '/api/v1/summarize': {
                    post: {
                        summary: 'Parse and summarize a PDF file',
                        responses: {
                            '200': {
                                description: 'Structured deconstruction metadata'
                            }
                        }
                    }
                }
            }
        }
    },
    'Propel': {
        title: 'Propel',
        tagline: 'ATS keyword matching and resume parser tool',
        category: 'AI Engineering',
        desc: 'Resume optimization against job descriptions. ATS keywords, skill gaps, data-driven suggestions.',
        architecture: {
            description: 'Users input a Job Description and upload a Resume. The backend extracts text, compares skill gaps, and scores alignment using custom similarity matrices. The system prompts a Llama LLM to provide formatting rules, missing industry-standard skills, and tailored bullet-point enhancements.',
            nodes: [
                { id: 'client', label: 'Next.js + Framer Motion', layer: 'Frontend', desc: 'Displays score gauges, list of missing keywords.' },
                { id: 'api', label: 'FastAPI Backend', layer: 'Backend Service', desc: 'Processes text extraction and parses structured resume sections.' },
                { id: 'eval', label: 'LLM Evaluator', layer: 'Analysis Engine', desc: 'Runs prompt models for ATS evaluation and rewrite tips.' }
            ],
            connections: [
                { from: 'client', to: 'api', type: 'HTTP POST (Resume + Job details)' },
                { from: 'api', to: 'eval', type: 'Analysis prompts' },
                { from: 'eval', to: 'api', type: 'Score & suggestion nodes' },
                { from: 'api', to: 'client', type: 'Tailwind-ready report JSON' }
            ]
        },
        endpoints: [
            {
                method: 'POST',
                path: '/api/v1/analyze',
                description: 'Analyze resume text against job description for key metric scoring.',
                headers: { 'Content-Type': 'application/json' },
                params: [],
                requestBody: JSON.stringify({
                    resume_text: 'John Doe. Software Engineer. React, Node.js, SQLite...',
                    job_description: 'We are seeking a senior backend dev with FastAPI, Go, Docker, PostgreSQL...'
                }, null, 2),
                responseBody: JSON.stringify({
                    match_score: 68.5,
                    key_metrics: {
                        keyword_match: 55,
                        formatting: 90,
                        experience_alignment: 60
                    },
                    missing_keywords: ['FastAPI', 'Go', 'Docker', 'PostgreSQL'],
                    suggested_improvements: [
                        { section: 'Skills', suggestion: 'Explicitly list Go and FastAPI in your technical skill list.' },
                        { section: 'Experience', suggestion: 'Rewrite first role to include container deployment using Docker.' }
                    ]
                }, null, 2)
            }
        ],
        openapi: {
            openapi: '3.0.0',
            info: {
                title: 'Propel Resume Analyzer API',
                version: '1.0.0'
            },
            paths: {
                '/api/v1/analyze': {
                    post: {
                        summary: 'Get ATS score and keyword gap analysis',
                        responses: {
                            '200': {
                                description: 'Score card metrics and text rewrite suggestions'
                            }
                        }
                    }
                }
            }
        }
    },
    'Voyage': {
        title: 'Voyage',
        tagline: 'AI travel itineraries with interactive map displays',
        category: 'AI Engineering',
        desc: 'AI travel itineraries with interactive maps and offline PDF export.',
        architecture: {
            description: 'Voyage takes destination preferences and travel duration. The backend sends a structured plan request to a Groq Llama model, which responds with formatted itinerary steps containing coordinates. The frontend uses Leaflet to render markers and routing lines on an interactive map, and serves printer-friendly styles.',
            nodes: [
                { id: 'client', label: 'Next.js UI (Leaflet)', layer: 'Frontend', desc: 'Renders map route overlays and printable pages.' },
                { id: 'api', label: 'FastAPI Service', layer: 'Backend Service', desc: 'Orchestrates trip state and queries location catalogs.' },
                { id: 'groq', label: 'Groq LLM API', layer: 'Inference Engine', desc: 'Generates day-by-day itineraries mapped to coordinates.' }
            ],
            connections: [
                { from: 'client', to: 'api', type: 'HTTP POST (Pref details)' },
                { from: 'api', to: 'groq', type: 'Itinerary constraints prompt' },
                { from: 'groq', to: 'api', type: 'JSON outline with geolocation coords' },
                { from: 'api', to: 'client', type: 'Geopoint routing array' }
            ]
        },
        endpoints: [
            {
                method: 'POST',
                path: '/api/v1/itinerary/generate',
                description: 'Generate coordinate-mapped multi-day travel routes.',
                headers: { 'Content-Type': 'application/json' },
                params: [],
                requestBody: JSON.stringify({
                    destination: 'Lusaka, Zambia',
                    days: 3,
                    budget: 'moderate',
                    interests: ['nature', 'local food']
                }, null, 2),
                responseBody: JSON.stringify({
                    destination: 'Lusaka, Zambia',
                    days_count: 3,
                    map_center: [-15.4167, 28.2833],
                    days: [
                        {
                            day: 1,
                            theme: 'Wildlife & Culture Showcase',
                            activities: [
                                {
                                    time: '09:00 AM',
                                    title: 'Munda Wanga Environmental Park',
                                    description: 'Observe native species and rehabilitation gardens.',
                                    coords: [-15.5333, 28.2667]
                                },
                                {
                                    time: '02:00 PM',
                                    title: 'Lusaka National Museum',
                                    description: 'Cultural history and contemporary art exhibitions.',
                                    coords: [-15.4211, 28.2917]
                                }
                            ]
                        }
                    ]
                }, null, 2)
            }
        ],
        openapi: {
            openapi: '3.0.0',
            info: { title: 'Voyage Itinerary API', version: '1.0.0' },
            paths: {
                '/api/v1/itinerary/generate': {
                    post: {
                        summary: 'Generate travel itinerary',
                        responses: {
                            '200': { description: 'Success' }
                        }
                    }
                }
            }
        }
    },
    'Nkani News Aggregator': {
        title: 'Nkani News Aggregator',
        tagline: 'Scraping and sentiment tracking NLP platform',
        category: 'AI Engineering',
        desc: 'Real-time news scraping with VADER sentiment analysis. The emotional tone of every story, upfront.',
        architecture: {
            description: 'Scrapers run periodically, fetching headlines and text from regional sites. The Flask core processes headlines using the VADER sentiment algorithm. Articles are tagged (Positive, Neutral, Negative) and stored. The UI renders the news grid with color-coded sentiment labels.',
            nodes: [
                { id: 'client', label: 'HTML/CSS Layout', layer: 'Frontend', desc: 'Displays headlines with corresponding sentiment meters.' },
                { id: 'flask', label: 'Flask Server', layer: 'Application Logic', desc: 'Serves dashboard templates and processes feeds.' },
                { id: 'vader', label: 'VADER Sentiment', layer: 'NLP Model', desc: 'Analyzes string polarity to yield positive, negative, and neutral scores.' },
                { id: 'scraper', label: 'BeautifulSoup Scraper', layer: 'Data Fetcher', desc: 'Extracts article links from public RSS and portal news sites.' }
            ],
            connections: [
                { from: 'scraper', to: 'flask', type: 'Feed collection' },
                { from: 'flask', to: 'vader', type: 'Headline input' },
                { from: 'vader', to: 'flask', type: 'Sentiment vector mapping' },
                { from: 'flask', to: 'client', type: 'Rendered web page template' }
            ]
        },
        endpoints: [
            {
                method: 'GET',
                path: '/api/news',
                description: 'Fetch the list of aggregated articles with polarity scores.',
                headers: { 'Accept': 'application/json' },
                params: [
                    { name: 'category', type: 'String', required: false, desc: 'Filter by news category (e.g. business, politics).' },
                    { name: 'min_score', type: 'Float', required: false, desc: 'Filter items with sentiment threshold (range -1.0 to 1.0).' }
                ],
                requestBody: 'None',
                responseBody: JSON.stringify([
                    {
                        title: 'Zambian Tech Sector Receives Investment Surge',
                        source: 'Tech ZM',
                        url: 'https://example.com/article1',
                        sentiment: 'positive',
                        compound_score: 0.762,
                        scraped_time: '2026-07-15T12:00:00Z'
                    },
                    {
                        title: 'Transport Strike Halts Morning Rail Traffic',
                        source: 'National Post',
                        url: 'https://example.com/article2',
                        sentiment: 'negative',
                        compound_score: -0.648,
                        scraped_time: '2026-07-15T11:45:00Z'
                    }
                ], null, 2)
            }
        ],
        openapi: {
            openapi: '3.0.0',
            info: { title: 'Nkani News API', version: '1.0.0' },
            paths: {
                '/api/news': {
                    get: {
                        summary: 'Retrieve sentiment catalog',
                        responses: {
                            '200': { description: 'Success' }
                        }
                    }
                }
            }
        }
    },
    'Mini E-Commerce': {
        title: 'Mini E-Commerce',
        tagline: 'MongoDB and Context API shopping system',
        category: 'Full-Stack',
        desc: 'Catalog, cart, checkout. Product filtering, Context API state, MongoDB storage.',
        architecture: {
            description: 'A React application built with Vite and Tailwind CSS. State is tracked globally using React Context API to manage session carts. The backend Node.js Express server handles user registration, catalog inventory filters, and orders with a MongoDB database backend.',
            nodes: [
                { id: 'client', label: 'Vite + React Context', layer: 'Frontend', desc: 'Maintains global client-side cart structure.' },
                { id: 'express', label: 'Express Backend', layer: 'Server Core', desc: 'Routes authentication, cart database writes, validation.' },
                { id: 'mongodb', label: 'MongoDB Database', layer: 'Data Store', desc: 'Stores details for products, users, transactions.' }
            ],
            connections: [
                { from: 'client', to: 'express', type: 'REST API requests (JSON)' },
                { from: 'express', to: 'mongodb', type: 'Mongoose ODM queries' },
                { from: 'mongodb', to: 'express', type: 'Query results' },
                { from: 'express', to: 'client', type: 'JSON payload sync' }
            ]
        },
        endpoints: [
            {
                method: 'GET',
                path: '/api/products',
                description: 'Query product catalog with page limit and type queries.',
                headers: { 'Accept': 'application/json' },
                params: [
                    { name: 'category', type: 'String', required: false, desc: 'Product group selector.' },
                    { name: 'limit', type: 'Integer', required: false, desc: 'Pagination size indicator.' }
                ],
                requestBody: 'None',
                responseBody: JSON.stringify({
                    products: [
                        { id: '1', title: 'Ergonomic Desk Chair', price: 189.99, category: 'furniture', stock: 12 }
                    ],
                    total: 1
                }, null, 2)
            },
            {
                method: 'POST',
                path: '/api/orders',
                description: 'Record a mock order transaction catalog.',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer [jwt_token]' },
                params: [],
                requestBody: JSON.stringify({
                    cart: [
                        { product_id: '1', quantity: 2 }
                    ],
                    shipping_address: '101 Great East Road, Lusaka'
                }, null, 2),
                responseBody: JSON.stringify({
                    order_id: 'ord_771829',
                    status: 'processing',
                    total_amount: 379.98,
                    estimated_delivery: '2026-07-20T17:00:00Z'
                }, null, 2)
            }
        ],
        openapi: {
            openapi: '3.0.0',
            info: { title: 'Mini Commerce API', version: '1.0.0' },
            paths: {
                '/api/products': { get: { summary: 'Get catalog items' } },
                '/api/orders': { post: { summary: 'Create purchase order' } }
            }
        }
    },
    'Berkshire Hathaway Redesign': {
        title: 'Berkshire Hathaway Redesign',
        tagline: 'Modern responsive rebuild of a classic portal',
        category: 'Full-Stack',
        desc: 'The famously plain corporate site, rebuilt. Minimal, responsive, still all substance.',
        architecture: {
            description: 'Rebuilds the iconic text-only corporate website. The layout uses high-fidelity typography and modular React components. A Node.js Express server exposes historical reports and letters, while MongoDB manages administrative documents.',
            nodes: [
                { id: 'client', label: 'Vite React App', layer: 'Frontend', desc: 'Responsive layouts holding shareholder logs.' },
                { id: 'express', label: 'Express Backend', layer: 'Server Core', desc: 'Streams PDF letters, serves company indices.' },
                { id: 'mongodb', label: 'MongoDB', layer: 'Data Store', desc: 'Maintains timeline releases and shareholder letters metadata.' }
            ],
            connections: [
                { from: 'client', to: 'express', type: 'HTTP GET / letters request' },
                { from: 'express', to: 'mongodb', type: 'Aggregation search' },
                { from: 'mongodb', to: 'express', type: 'JSON indices' },
                { from: 'express', to: 'client', type: 'Structured links catalog' }
            ]
        },
        endpoints: [
            {
                method: 'GET',
                path: '/api/letters',
                description: 'Fetch letters to shareholders by year range.',
                headers: { 'Accept': 'application/json' },
                params: [
                    { name: 'year', type: 'Integer', required: false, desc: 'Optional single year request (e.g. 2024).' }
                ],
                requestBody: 'None',
                responseBody: JSON.stringify([
                    { year: 2024, title: '2024 Letter to Shareholders', pdf_url: '/letters/2024.pdf', length_pages: 18 },
                    { year: 2023, title: '2023 Letter to Shareholders', pdf_url: '/letters/2023.pdf', length_pages: 17 }
                ], null, 2)
            }
        ],
        openapi: {
            openapi: '3.0.0',
            info: { title: 'Shareholder Letters API', version: '1.0.0' },
            paths: {
                '/api/letters': { get: { summary: 'Get letter index' } }
            }
        }
    },
    'Personal Portfolio': {
        title: 'Personal Portfolio',
        tagline: 'Static site generated editorial work showcase',
        category: 'Full-Stack',
        desc: 'This site. Next.js, editorial layout, light/dark theming.',
        architecture: {
            description: 'A Next.js application designed with pure CSS. High-contrast themes are supported pre-paint using dangerouslySetInnerHTML inline checks. The contact form triggers a Next.js server route that uses Nodemailer to send clean SMTP messages to the administrator.',
            nodes: [
                { id: 'client', label: 'Next.js SSG Pages', layer: 'Frontend', desc: 'Pre-rendered pages with CSS variables toggling.' },
                { id: 'route', label: 'Next API Route', layer: 'Server Endpoint', desc: 'Processes forms and sends SMTP mail payloads.' }
            ],
            connections: [
                { from: 'client', to: 'route', type: 'HTTPS POST (JSON body)' },
                { from: 'route', to: 'client', type: 'Status feedback message' }
            ]
        },
        endpoints: [
            {
                method: 'POST',
                path: '/api/contact',
                description: 'Handle contact form submissions and dispatch SMTP notifications.',
                headers: { 'Content-Type': 'application/json' },
                params: [],
                requestBody: JSON.stringify({
                    name: 'Sarah Connor',
                    email: 'sarah@cyberdyne.com',
                    message: 'Interested in system architecture consulting.'
                }, null, 2),
                responseBody: JSON.stringify({
                    success: true,
                    message: 'Form processed and email dispatched successfully.'
                }, null, 2)
            }
        ],
        openapi: {
            openapi: '3.0.0',
            info: { title: 'Portfolio Core API', version: '1.0.0' },
            paths: {
                '/api/contact': { post: { summary: 'Send email notification' } }
            }
        }
    },
    'Events Manager': {
        title: 'Events Manager',
        tagline: 'JavaFX calendar tracker using in-memory caches',
        category: 'Desktop / Systems',
        desc: 'Event scheduling desktop app. Fast lookups via HashMap-backed storage.',
        architecture: {
            description: 'A Java desktop application using JavaFX for the user interface. Event schedules are stored in local models. Lookups and queries are optimized using a local HashMap database where search strings serve as primary index keys to return O(1) response times.',
            nodes: [
                { id: 'ui', label: 'JavaFX View Stage', layer: 'Desktop View', desc: 'Constructs grid sheets, layout panes, calendar overlays.' },
                { id: 'ctrl', label: 'Controller Middleware', layer: 'Application Logic', desc: 'Intercepts user action events and triggers model operations.' },
                { id: 'hash', label: 'HashMap InMemory Store', layer: 'Data Cache', desc: 'Manages O(1) searches using indexed key records.' }
            ],
            connections: [
                { from: 'ui', to: 'ctrl', type: 'JavaFX ActionEvent' },
                { from: 'ctrl', to: 'hash', type: 'Map Query Operations' },
                { from: 'hash', to: 'ctrl', type: 'Entity Model Stream' },
                { from: 'ctrl', to: 'ui', type: 'FXML Layout Refresh' }
            ]
        },
        endpoints: [],
        openapi: null
    },
    'ChronoScholar': {
        title: 'ChronoScholar',
        tagline: 'Desktop student productivity and GPA database tracker',
        category: 'Desktop / Systems',
        desc: 'Task management meets GPA tracking. Daily productivity tied to academic goals.',
        architecture: {
            description: 'Built in Java with a JavaFX graphical interface. Coordinates schedule tracking with GPA projection calculations. A localized relational database (SQLite) manages relational records (courses, grades, task statuses, deadlines) using JDBC drivers.',
            nodes: [
                { id: 'ui', label: 'JavaFX Workspace', layer: 'Desktop View', desc: 'Renders GPA graphs, progress tracking tasks.' },
                { id: 'jdbc', label: 'JDBC Model Layer', layer: 'Database Middleware', desc: 'Maps records to database objects.' },
                { id: 'sqlite', label: 'SQLite DB', layer: 'Embedded Storage', desc: 'Local SQL engine maintaining coursework relationships.' }
            ],
            connections: [
                { from: 'ui', to: 'jdbc', type: 'Java Call Method' },
                { from: 'jdbc', to: 'sqlite', type: 'SQL query transaction' },
                { from: 'sqlite', to: 'jdbc', type: 'ResultSets extraction' },
                { from: 'jdbc', to: 'ui', type: 'Data models array refresh' }
            ]
        },
        endpoints: [],
        openapi: null
    },
    'Student Management System': {
        title: 'Student Management System',
        tagline: 'C++/CLI course database index manager',
        category: 'Desktop / Systems',
        desc: 'Student, faculty, and course records with relational integrity.',
        architecture: {
            description: 'Constructed using C++/CLI to combine native runtime performance with structured visual layouts. A remote MySQL database stores registration records. Tables are linked through strict relational foreign keys to enforce data integrity across tables.',
            nodes: [
                { id: 'cli', label: 'C++/CLI Layout', layer: 'Desktop UI', desc: 'Renders input forms and relational grid elements.' },
                { id: 'mysql', label: 'MySQL Database', layer: 'Remote Storage', desc: 'Hosts relational schemas, course indices, student details.' }
            ],
            connections: [
                { from: 'cli', to: 'mysql', type: 'MySQL Connector/C++ Query' },
                { from: 'mysql', to: 'cli', type: 'Relational data streams' }
            ]
        },
        endpoints: [],
        openapi: null
    }
};
