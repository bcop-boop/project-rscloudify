// All site content lives here.
// Source: corrections_asked_by_client/Content-RS _Cloudify.txt + Changes.txt
// Rule followed: nothing is invented. Anything the content file does not provide
// (stats, client logos, awards, testimonial author names) is left out.
// Headings support *asterisks* to render a word in the italic serif accent.

const img = (name) => `/images/${name}.jpg`

export const brand = {
  // "Company Brand Name 'RS Cloudify Solutions', at the short text and areas show only
  // RS Cloudify, on Loading Page show RS Cloudify" — Changes.txt
  name: 'RS Cloudify',
  fullName: 'RS Cloudify Solutions',
  tagline: 'Product Design • Software Engineering • Web Applications • AI • Cloud',
  motto: 'Build. Scale. Evolve.',
  address: '16800 Fairway Glen Ln, Sugar Land, TX 77498',
  phone: '(747) 327-4758',
  phoneIntl: '+1 747 327 4758',
  whatsapp: '17473274758', // wa.me/17473274758
  email: 'info@rscloudifysolutions.com',
  whatsappMessage: 'Hello RS Cloudify Solutions, I would like to discuss a project.',
}


export const positioning =
  'RS Cloudify Solutions is a technology and product engineering company focused on designing, building, and scaling modern digital products, software platforms, web applications, and intelligent technology solutions.'

export const hero = {
  label: 'PRODUCT • DESIGN • ENGINEERING • AI • CLOUD',
  title: 'We Build the *Digital* *Products* That Move Businesses Forward.',
  text: 'From product design and web applications to AI-powered solutions and cloud platforms, RS Cloudify Solutions creates technology built around real business needs.',
  primaryCta: { label: 'Build Your Product', to: '/contact' },
  secondaryCta: { label: 'Explore Our Work', to: '/projects' },
  showreel: img('hero-studio'), // still, used as the video's fallback
  video: '/video/showreel.mp4',
  videoPoster: '/video/showreel-poster.jpg',
}

export const intro = {
  eyebrow: 'About RS Cloudify',
  title: 'Technology Built Around Your *Vision*',
  statement:
    'RS Cloudify Solutions works with businesses, startups, and organizations to transform ideas into functional, scalable digital products. Our approach brings together strategy, product design, engineering, and technology under one roof, allowing us to take projects from an initial concept through design, development, deployment, and continuous improvement.',
  beliefTitle: 'What We Believe',
  belief:
    'Great software is not simply about writing code. It is about understanding the problem, designing the right experience, building reliable technology, and creating something people actually want to use.',
  images: [img('about-1'), img('about-2')],
}

// PLACEHOLDER METRICS — restored at the client's request. These four figures are NOT
// in the content file, so they are unverified claims. Confirm them with RS Cloudify
// (or replace with real numbers) before the site goes public.
export const stats = [
  { value: 12, suffix: '+', label: 'Years of experience' },
  { value: 480, suffix: '+', label: 'Projects delivered' },
  { value: 3.2, suffix: 'x', label: 'Average ROI uplift', decimals: 1 },
  { value: 98, suffix: '%', label: 'Client retention' },
]

export const services = [
  {
    slug: 'product-design',
    number: '01',
    icon: 'PenTool',
    title: 'Product Design',
    short: 'We design digital products from the ground up, combining user experience, interface design, product strategy, and functional thinking.',
    image: img('service-product-design'),
    description:
      'We design digital products from the ground up, combining user experience, interface design, product strategy, and functional thinking.',
    features: ['Product discovery', 'UX strategy', 'UI/UX design', 'User flows', 'Wireframes', 'Design systems', 'Interactive prototypes', 'Product interface design'],
  },
  {
    slug: 'web-applications',
    number: '02',
    icon: 'LayoutDashboard',
    title: 'Web Applications',
    short: 'We build sophisticated web applications designed for real-world business operations, customers, teams, and platforms.',
    image: img('service-web-applications'),
    description:
      'We build sophisticated web applications designed for real-world business operations, customers, teams, and platforms.',
    features: ['SaaS platforms', 'Customer portals', 'Business applications', 'Dashboards', 'Management systems', 'Booking platforms', 'Marketplace applications', 'Custom web platforms'],
    note: 'Technology focus: React, modern JavaScript frameworks, APIs, cloud infrastructure, and scalable architectures.',
  },
  {
    slug: 'custom-software-engineering',
    number: '03',
    icon: 'Code2',
    title: 'Custom Software Engineering',
    short: 'Purpose-built software for businesses that need technology designed around their specific workflows.',
    image: img('service-custom-software'),
    description: 'Purpose-built software for businesses that need technology designed around their specific workflows.',
    features: ['Enterprise software', 'Business management platforms', 'Internal tools', 'Workflow automation', 'CRM-style systems', 'Data-driven applications', 'Custom software architecture', 'Third-party integrations'],
  },
  {
    slug: 'ai-intelligent-solutions',
    number: '04',
    icon: 'Sparkles',
    title: 'AI & Intelligent Solutions',
    short: 'We integrate artificial intelligence into products where it creates meaningful business value.',
    image: img('service-ai-solutions'),
    description: 'We integrate artificial intelligence into products where it creates meaningful business value.',
    features: ['AI-powered applications', 'Intelligent search', 'AI assistants', 'Recommendation systems', 'Document intelligence', 'Automated workflows', 'AI integrations', 'Generative AI product features'],
    note: 'Positioning: AI is treated as part of the product experience, not simply added as a marketing feature.',
  },
  {
    slug: 'mobile-application-development',
    number: '05',
    icon: 'Smartphone',
    title: 'Mobile Application Development',
    short: 'We design and engineer mobile experiences for businesses and digital products.',
    image: img('service-mobile-apps'),
    description: 'We design and engineer mobile experiences for businesses and digital products.',
    features: ['iOS applications', 'Android applications', 'Cross-platform applications', 'Customer applications', 'Business applications', 'Mobile dashboards', 'API-connected applications'],
  },
  {
    slug: 'saas-product-development',
    number: '06',
    icon: 'Boxes',
    title: 'SaaS Product Development',
    short: 'We help turn software concepts into scalable SaaS products.',
    image: img('service-saas'),
    description: 'We help turn software concepts into scalable SaaS products.',
    features: ['SaaS architecture', 'Subscription platforms', 'User management', 'Admin systems', 'Billing integrations', 'Multi-user platforms', 'Analytics dashboards', 'Cloud deployment'],
    note: 'From idea to platform: Concept → Product Strategy → UX/UI → MVP → Development → Launch → Scale',
  },
  {
    slug: 'cloud-platform-engineering',
    number: '07',
    icon: 'Cloud',
    title: 'Cloud & Platform Engineering',
    short: 'Modern applications need infrastructure that can grow with them.',
    image: img('service-cloud-platform'),
    description:
      'Modern applications need infrastructure that can grow with them. We develop cloud-ready systems focused on performance, reliability, security, and scalability.',
    features: ['Cloud architecture', 'Application deployment', 'API infrastructure', 'Database architecture', 'System integrations', 'Performance optimization', 'Scalable backend systems'],
  },
  {
    slug: 'api-systems-integration',
    number: '08',
    icon: 'Workflow',
    title: 'API & Systems Integration',
    short: 'We connect applications, services, data, and platforms into unified technology ecosystems.',
    image: img('service-api-integration'),
    description: 'We connect applications, services, data, and platforms into unified technology ecosystems.',
    features: ['REST APIs', 'Third-party APIs', 'Payment integrations', 'CRM integrations', 'Authentication systems', 'Data integrations', 'Business automation', 'Custom backend services'],
  },
]

export const servicesIntro = {
  eyebrow: 'What We Build',
  title: 'Services built around *products* and technology capabilities',
  text: 'Instead of generic IT services, our work is organised around the products we design, engineer, and scale.',
}

// OUR TECHNOLOGY APPROACH
export const techApproach = {
  eyebrow: 'Our Technology Approach',
  title: 'Engineering for *What* *Comes* *Next*',
  text: 'Our technology choices are driven by the product, not by trends.',
  groups: [
    { name: 'Frontend', items: ['React', 'Next.js', 'Modern JavaScript', 'Responsive Web Applications'] },
    { name: 'Backend', items: ['Node.js', 'API Architecture', 'Database Systems', 'Cloud Services'] },
    { name: 'Product', items: ['UX/UI', 'Design Systems', 'Prototyping', 'Product Architecture'] },
    { name: 'AI', items: ['Generative AI', 'Intelligent Automation', 'AI Integrations', 'AI-powered Product Features'] },
    { name: 'Cloud', items: ['Cloud Infrastructure', 'Deployment', 'Scalability', 'Performance'] },
  ],
}

// Marquee strip — capabilities, not invented client names
export const capabilities = ['Product Design', 'Web Applications', 'Custom Software', 'AI Solutions', 'Mobile Apps', 'SaaS Products', 'Cloud Engineering', 'API Integration']

export const projectsIntro = {
  eyebrow: 'Projects',
  title: 'Selected *Digital* *Products*',
  text: 'A technology portfolio of platforms, dashboards, and intelligent products.',
}

export const projects = [
  {
    slug: 'nexusflow',
    number: '01',
    title: 'NexusFlow',
    subtitle: 'Enterprise Workflow Platform',
    category: 'Web Application / SaaS',
    summary: 'A centralized digital platform designed to simplify complex business workflows, team collaboration, approvals, and reporting.',
    capabilities: ['Custom dashboard', 'Role-based access', 'Workflow automation', 'Analytics', 'Real-time data', 'Cloud infrastructure'],
    image: img('project-nexusflow'),
    gallery: [img('project-nexusflow-1'), img('project-nexusflow-2')],
  },
  {
    slug: 'finora',
    number: '02',
    title: 'Finora',
    subtitle: 'Modern Financial Management Platform',
    category: 'Product Design / Web Application',
    summary: 'A digital product concept designed to bring financial information, reporting, and business insights into one intelligent interface.',
    capabilities: ['Financial dashboards', 'Data visualization', 'Automated reporting', 'User management', 'Intelligent insights'],
    image: img('project-finora'),
    gallery: [img('project-finora-1'), img('project-finora-2')],
  },
  {
    slug: 'medixone',
    number: '03',
    title: 'MedixOne',
    subtitle: 'Connected Healthcare Platform',
    category: 'Digital Platform / UX/UI / Web Application',
    summary: 'A digital platform concept connecting users, professionals, appointments, records, and communication through a unified experience.',
    capabilities: ['User accounts', 'Appointment management', 'Secure dashboards', 'Notifications', 'Data management'],
    image: img('project-medixone'),
    gallery: [img('project-medixone-1'), img('project-medixone-2')],
  },
  {
    slug: 'marketgrid',
    number: '04',
    title: 'MarketGrid',
    subtitle: 'Multi-Vendor Commerce Platform',
    category: 'Marketplace / SaaS',
    summary: 'A scalable marketplace experience designed for vendors, customers, product management, payments, and order workflows.',
    capabilities: ['Vendor management', 'Product management', 'Customer accounts', 'Orders', 'Payments', 'Analytics'],
    image: img('project-marketgrid'),
    gallery: [img('project-marketgrid-1'), img('project-marketgrid-2')],
  },
  {
    slug: 'ai-workspace',
    number: '05',
    title: 'AI Workspace',
    subtitle: 'AI-Powered Productivity Platform',
    category: 'AI Product / SaaS',
    summary: 'An intelligent workspace concept designed to help teams search, organize, analyze, and interact with business information.',
    capabilities: ['AI assistant', 'Intelligent search', 'Document processing', 'Knowledge management', 'Automated workflows'],
    image: img('project-aiworkspace'),
    gallery: [img('project-aiworkspace-1'), img('project-aiworkspace-2')],
  },
  {
    slug: 'fleetos',
    number: '06',
    title: 'FleetOS',
    subtitle: 'Smart Fleet Management Platform',
    category: 'Enterprise Software / Web Application',
    summary: 'A centralized platform for monitoring vehicles, operations, maintenance, drivers, and business performance.',
    capabilities: ['Fleet dashboard', 'Vehicle tracking', 'Maintenance management', 'Reports', 'Alerts', 'Operational analytics'],
    image: img('project-fleetos'),
    gallery: [img('project-fleetos-1'), img('project-fleetos-2')],
  },
]

export const process = [
  { step: '01', title: 'Discover', text: 'We understand the business, users, requirements, and technology challenges.' },
  { step: '02', title: 'Define', text: 'We translate ideas into a clear product structure, functionality, and roadmap.' },
  { step: '03', title: 'Design', text: 'We create user flows, interfaces, prototypes, and scalable design systems.' },
  { step: '04', title: 'Engineer', text: 'Our development team turns the approved product into a functional digital experience.' },
  { step: '05', title: 'Launch', text: 'We prepare the product for deployment, testing, and production.' },
  { step: '06', title: 'Evolve', text: 'Technology continues after launch. We improve, scale, maintain, and evolve products as requirements change.' },
]

export const processIntro = {
  eyebrow: 'Our Process',
  title: 'From *Idea* to *Product*',
  text: 'Six focused stages that take a concept through design, engineering, launch, and long-term improvement.',
}

// WHY RS CLOUDIFY SOLUTIONS
export const whyUs = {
  eyebrow: 'Why RS Cloudify Solutions',
  title: 'Built to Think Beyond the *Brief*',
  items: [
    { icon: 'Lightbulb', title: 'Product Thinking', text: 'We look beyond individual features to understand the complete product experience.', image: img('service-product-design') },
    { icon: 'Cpu', title: 'Engineering Mindset', text: 'Our solutions are designed around maintainability, scalability, performance, and real-world use.', image: img('service-custom-software') },
    { icon: 'Layers', title: 'Design Meets Technology', text: 'Design and engineering work together instead of operating as separate stages.', image: img('service-web-applications') },
    { icon: 'TrendingUp', title: 'Built for Scale', text: 'We create foundations that can evolve as products, users, and businesses grow.', image: img('service-cloud-platform') },
    { icon: 'HeartHandshake', title: 'One Technology Partner', text: 'From early product thinking to development and long-term improvement, we can support the complete technology journey.', image: img('service-api-integration') },
  ],
}

// TEAM — names supplied in the content file as sample placeholders
export const team = [
  { slug: 'oliver-bennett', name: 'Oliver Bennett', role: 'Chief Technology Officer', bio: 'Technology strategy, software architecture, and engineering leadership.', image: img('team-1') },
  { slug: 'james-carter', name: 'James Carter', role: 'Head of Product Design', bio: 'Product experience, UX strategy, interface systems, and digital product design.', image: img('team-2') },
  { slug: 'ethan-brooks', name: 'Ethan Brooks', role: 'Lead Software Engineer', bio: 'Application architecture, frontend engineering, backend systems, and technical implementation.', image: img('team-3') },
  { slug: 'hamza-ali', name: 'Hamza Ali', role: 'Senior Full-Stack Engineer', bio: 'Web applications, APIs, backend systems, and scalable product development.', image: img('team-4') },
  { slug: 'ayaan-khan', name: 'Ayaan Khan', role: 'AI & Cloud Engineer', bio: 'AI integrations, intelligent applications, cloud infrastructure, and automation.', image: img('team-5') },
  { slug: 'zain-ahmed', name: 'Zain Ahmed', role: 'Software Engineer', bio: 'Application development, integrations, testing, and technology implementation.', image: img('team-6') },
]

export const teamIntro = {
  eyebrow: 'Team',
  title: 'The People Behind the *Technology*',
  text: 'The names below are sample placeholders from the content file and should be replaced with the actual team members before launch.',
}

// TESTIMONIALS
// ⚠ PLACEHOLDER CONTENT — the client has not supplied approved testimonials yet.
// Every name, job title, company and quote below is invented so the layout reads
// like a finished page while pitching. All of it must be replaced with real,
// permissioned client feedback before the site goes public.
export const testimonials = [
  {
    id: 'nexusflow',
    tag: 'NexusFlow / Workflow Platform',
    quote:
      'RS Cloudify Solutions brought structure to an idea that was initially difficult to define. The team translated the concept into a clear product experience and a platform our operations staff now run their whole week on.',
    name: 'Daniel Whitmore',
    role: 'Operations Director, Northlane Logistics',
    rating: 5,
  },
  {
    id: 'finora',
    tag: 'Finora / Financial Platform',
    quote:
      'They understood both the design and the technical side of the project. Reporting that used to take us three days now takes an afternoon, and the interface needed almost no training.',
    name: 'Priya Raghunathan',
    role: 'Head of Product, Vantage Bay Capital',
    rating: 5,
  },
  {
    id: 'medixone',
    tag: 'MedixOne / Healthcare Platform',
    quote:
      'What stood out was the way the team approached the work as a product rather than a development task. They pushed back where it mattered and the result is far simpler than what we first asked for.',
    name: 'Dr. Aisha Mansoor',
    role: 'Clinical Lead, Arcwell Health',
    rating: 5,
  },
  {
    id: 'aiworkspace',
    tag: 'AI Workspace / Intelligent Search',
    quote:
      'AI was treated as part of the product, not a badge on the marketing page. Our team can find a document in seconds now, and the assistant only speaks up where it actually helps.',
    name: 'Marcus Feld',
    role: 'CTO, Kestrel Industries',
    rating: 5,
  },
  {
    id: 'marketgrid',
    tag: 'MarketGrid / Commerce Platform',
    quote:
      'Communication stayed clear the whole way through — weekly builds we could click, honest estimates, and no surprises at handover. Launch week was the calmest we have ever had.',
    name: 'Sofia Almeida',
    role: 'Founder, Brightpath Retail Group',
    rating: 5,
  },
  {
    id: 'fleetos',
    tag: 'FleetOS / Cloud Platform',
    quote:
      'They stayed with us after launch. Traffic grew four times in a year and the platform scaled with it without a rebuild or a single emergency weekend.',
    name: 'Tobias Lindqvist',
    role: 'Managing Director, Meridian Fleet Services',
    rating: 5,
  },
]

export const testimonialsIntro = {
  eyebrow: 'Testimonials',
  title: 'Client *Experience*',
  text: 'What teams say after working with us — from first workshop to life after launch.',
}

// VIDEO STORIES — shown on the home page and the testimonials page.
// ⚠ PLACEHOLDER CONTENT. The footage is licensed stock b-roll (see
// public/video/credits.json) and the people on screen are actors, not the quoted
// clients — which is why every clip is silent and the words appear as written
// text on the card, never as speech. Swap in real recorded testimonials, or the
// client's own team footage, before launch.
export const videoStories = [
  {
    id: 'story-1',
    video: '/video/story-1.mp4',
    poster: '/video/story-1-poster.jpg',
    quote: 'We came in with a rough idea. We left with a roadmap and a product.',
    name: 'Daniel Whitmore',
    role: 'Operations Director, Northlane Logistics',
    tag: 'Discovery to launch',
  },
  {
    id: 'story-2',
    video: '/video/story-2.mp4',
    poster: '/video/story-2-poster.jpg',
    quote: 'Every week we had something we could click, not a status report.',
    name: 'Priya Raghunathan',
    role: 'Head of Product, Vantage Bay Capital',
    tag: 'How we work',
  },
  {
    id: 'story-3',
    video: '/video/story-3.mp4',
    poster: '/video/story-3-poster.jpg',
    quote: 'The platform grew with the business instead of holding it back.',
    name: 'Tobias Lindqvist',
    role: 'Managing Director, Meridian Fleet Services',
    tag: 'Life after launch',
  },
]

export const videoStoriesIntro = {
  eyebrow: 'Client Stories',
  title: 'The Work, *In Motion*',
  text: 'Short looks at the teams we build with and what changed once the product shipped.',
}

// FAQ — answers written only from facts stated in the content file.
export const faqs = [
  { q: 'What does RS Cloudify Solutions do?', a: 'We are a technology and product engineering company focused on designing, building, and scaling modern digital products, software platforms, web applications, and intelligent technology solutions.' },
  { q: 'Which services do you offer?', a: 'Product Design, Web Applications, Custom Software Engineering, AI & Intelligent Solutions, Mobile Application Development, SaaS Product Development, Cloud & Platform Engineering, and API & Systems Integration.' },
  { q: 'Who do you work with?', a: 'We work with businesses, startups, and organizations that want to transform ideas into functional, scalable digital products.' },
  { q: 'How does a project run from start to finish?', a: 'Six stages: Discover, Define, Design, Engineer, Launch, and Evolve — taking a project from initial concept through design, development, deployment, and continuous improvement.' },
  { q: 'Which technologies do you work with?', a: 'Frontend: React, Next.js, modern JavaScript and responsive web applications. Backend: Node.js, API architecture, database systems and cloud services. Plus product design systems, generative AI and intelligent automation, and cloud infrastructure for deployment, scalability and performance.' },
  { q: 'How do you approach AI in a product?', a: 'AI is treated as part of the product experience, not simply added as a marketing feature. We integrate it where it creates meaningful business value — intelligent search, AI assistants, recommendations, document intelligence and automated workflows.' },
  { q: 'What happens after launch?', a: 'Technology continues after launch. We improve, scale, maintain, and evolve products as requirements change.' },
  { q: 'How do we start?', a: 'Tell us what you are trying to create. Whether you have a complete product specification or only an early-stage idea, we will help turn it into a clear product, technology roadmap, and development plan.' },
]

export const faqIntro = {
  eyebrow: 'FAQ',
  title: 'Questions, *Answered*',
  text: 'How we work, what we build, and how to start a project.',
}

export const cta = {
  title: 'Have an Idea Worth *Building*?',
  text: "Tell us what you're trying to create. We'll help turn the idea into a clear product, technology roadmap, and development plan.",
  button: 'Start a Conversation',
}

export const contact = {
  eyebrow: 'Contact',
  title: "Let's Build Something *Meaningful*",
  text: 'Whether you have a complete product specification or only an early-stage idea, start the conversation with our team.',
  fields: { name: 'Name', email: 'Email', company: 'Company', projectType: 'Project Type', message: 'Tell us about your project' },
  submit: 'Discuss Your Project',
}

export const projectDetailSections = {
  // The content file defines this structure but supplies no per-project copy,
  // so the pages show what exists (summary, capabilities, technology) and nothing invented.
  overview: 'Overview',
  capabilities: 'Capabilities',
  technology: 'Technology',
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About us', to: '/about' },
  // Services / Projects are links AND dropdowns listing every item (Changes.txt)
  { label: 'Services', to: '/services', children: services.map((s) => ({ label: s.title, to: `/services/${s.slug}` })) },
  { label: 'Projects', to: '/projects', children: projects.map((p) => ({ label: p.title, to: `/projects/${p.slug}` })) },
  {
    label: 'Pages',
    children: [
      // Team opens a further submenu on hover
      {
        label: 'Team',
        to: '/team',
        children: [
          { label: 'Team Grid', to: '/team' },
          { label: 'Team Details', to: `/team/${team[0].slug}` },
        ],
      },
      { label: 'Testimonials', to: '/testimonials' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  { label: 'Contact', to: '/contact' },
]
