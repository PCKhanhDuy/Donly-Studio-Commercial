/*
  English interface strings.
  Long-form content (project write-ups, service copy, FAQ) lives next to the data
  in src/lib/*.js as t("vi", "en") — see src/i18n/t.js.

  This file and vi.js must always carry the SAME set of keys.
*/
const en = {
  common: {
    skipNav: "Skip to content",
    homeAria: "back to home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    scroll: "Scroll",
    view: "View",
    previous: "Previous image",
    next: "Next image",
    contact: "Contact",
    viewWork: "View work",
    viewAll: "View all",
    details: "Details",
    getQuote: "Get a quote",
    bookShoot: "Book a shoot",
    languageLabel: "Language",
    switchLanguage: "Chuyển sang tiếng Việt",
    studioCommercial: "Studio Commercial",
  },

  cta: {
    label: "Start a project",
    title: "Tell us what you need to shoot.",
    lead: "Send us the product, the number of SKUs or looks, and where the images will be used. We come back with a quote within 24 working hours.",
  },

  home: {
    metaTitle: "Studio Commercial",
    statementLabel: "Studio",
    statement:
      "We produce commercial imagery for fashion, lifestyle and consumer brands. An image doesn't need to be elaborate to do its job — it needs to be accurate, deliberate, and built to serve what you are selling.",
    aboutLink: "About DONLY",
    servicesLabel: "Services",
    servicesTitle: "Three things, done properly.",
    servicesLead:
      "Each format has its own aspect ratio, its own lighting approach and its own delivery standard. We don't lump them together.",
    bannerAlt:
      "A selection of DONLY Studio Commercial lookbook frames: six fashion images shot on location",
    featuredLabel: "Featured project",
    galleryLabel: "Gallery",
    galleryTitle: "Drag to browse.",
    worksLabel: "Work",
    worksTitle: "A few recent projects.",
    quoteNote:
      "Every frame on a shoot has a reason to exist, signed off on paper before a camera is switched on. Nothing gets shot for the sake of it.",
    processLabel: "Process",
    processTitle: "Five steps. None of them skipped.",
    clientsLabel: "Brands we have worked with",
  },

  works: {
    metaTitle: "Works",
    metaDescription:
      "Selected lookbook, campaign and product photography by DONLY Studio Commercial for fashion, lifestyle and consumer brands.",
    title: "Work we have done.",
    lead: "Every project below started from a specific commercial problem. Open one to see the brief, the approach and what was delivered.",
    projectsCount: "projects",
    clientsCount: "clients",
    collections: "collections",
    frames: "frames",
    industry: "Industry",
    year: "Year",
    clientCol: "Client",
    allCollections: "All collections",
    backToClients: "All clients",
    filterAria: "Filter by format",
    viewAria: "Choose a view",
    viewList: "List",
    viewGrid: "Grid",
    ctaLabel: "Your next project",
    ctaTitle: "Your next set could sit right here.",
  },

  work: {
    client: "Client",
    type: "Format",
    year: "Year",
    location: "Location",
    brief: "The problem",
    approach: "How we worked",
    result: "Outcome",
    bts: "Behind the scenes",
    credits: "Credits",
    nextProject: "Next project",
    notFoundTitle: "Project not found",
    ctaLabel: "Your project",
    ctaTitle: "Need a set like this one?",
  },

  services: {
    metaTitle: "Services",
    metaDescription:
      "Lookbook, campaign and product photography by DONLY Studio Commercial — deliverables, packages and how we work.",
    label: "Services",
    lead: "Three formats, three different delivery standards. Picking the right format is the first step to images that work where you actually need them.",
    deliverables: "Deliverables",
    bestFor: "Best for:",
    pricingLabel: "Pricing",
    pricingTitle: "Three packages, prices in the open.",
    pricingLead:
      "Prices below cover the studio, equipment, shooting crew and post-production. Models, stylists and props are quoted separately.",
    popular: "Most chosen",
    addOns: "Add-ons",
    processLabel: "Process",
    processTitle: "From brief to delivered files.",
    faqLabel: "FAQ",
    faqTitle: "What clients usually ask.",
    ctaLabel: "Pricing",
    ctaTitle: "Send a brief, get a quote within 24 hours.",
  },

  about: {
    metaTitle: "About",
    metaDescription:
      "DONLY Studio Commercial — a minimal commercial photography studio working with natural light, clean composition and true-to-life colour.",
    label: "About the studio",
    lead: "DONLY started from a wish to simplify how commercial imagery gets made. The name carries that idea: keep only what is needed — the right light, the right composition, the right message.",
    storyLabel: "Story",
    storyLead:
      "Most commercial images fail not for want of an idea, but for the weight of everything that wasn't needed.",
    storyBody: [
      "We started from a simple observation: a brand's customers are not buying an effect, they are buying a product. A set layered with filters and props can look good in a feed, yet leave the buyer unsure what the real thing looks like.",
      "So DONLY works the other way round: natural light or a close imitation of it, moderate contrast, true-to-life colour, and composition with plenty of negative space. The garment or the product is the only thing in frame allowed to carry colour.",
      "That approach makes a set outlive a single season, work across website, social and print at the same time, and — the part that matters — sell.",
    ],
    studioCaption: "AMELIEE — Emberly",
    viewWorks: "See our work",
    missionLabel: "Mission",
    missionText:
      "To help brands tell their product story through images that are sharp, consistent and commercially effective.",
    missionNote:
      "Not only good-looking, but effective at selling and at communicating.",
    visionLabel: "Vision",
    visionText:
      "To be the studio brands turn to first when they need a commercial set that holds together.",
    visionNote:
      "Holding together means usable everywhere — website, social and print — without reshooting for each channel.",
    principlesLabel: "Principles",
    principlesTitle: "Five things we don't compromise on.",
    positioningLabel: "Positioning",
    positioningTitle: "Where we stand.",
    btsLabel: "Selected frames",
    ctaLabel: "Working together",
    ctaTitle: "We are taking on projects for next season.",
  },

  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Book a lookbook, campaign or product shoot with DONLY Studio Commercial. We reply with a quote within 24 working hours.",
    label: "Contact",
    title: "Book a shoot.",
    lead: "Fill in the form below or email us directly. The clearer the description, the sharper the quote — we don't send generic numbers.",
    directLabel: "Direct",
    studioLabel: "Studio",
    followLabel: "Follow",
    checklistLabel: "For a fast quote, include",
    checklist: [
      "The format: lookbook, campaign or product",
      "The volume: how many SKUs or how many looks",
      "Where the images will run: website, social, print",
      "When you need the files",
    ],
    pricingLink: "See packages and pricing",
    mapLabel: "Finding the studio",
    mapNote: "Map placeholder — drop in a Google Maps embed or a map image here.",
  },

  form: {
    name: "Your name *",
    brand: "Brand *",
    email: "Email *",
    phone: "Phone",
    service: "Format *",
    servicePlaceholder: "Choose a format",
    date: "Preferred shoot date",
    budget: "Estimated budget",
    message: "Project description *",
    messagePlaceholder:
      "What needs shooting, how many SKUs or looks, and where will the images run?",
    serviceOptions: {
      lookbook: "Lookbook",
      campaign: "Campaign",
      product: "Product",
      khac: "Other / not sure yet",
    },
    budgetOptions: {
      "": "Not decided yet",
      "duoi-15": "Under 15 million VND",
      "15-30": "15 – 30 million VND",
      "30-60": "30 – 60 million VND",
      "tren-60": "Over 60 million VND",
    },
    submit: "Send request",
    submitting: "Sending…",
    responseNote: "We reply within 24 working hours.",
    sentLabel: "Sent",
    sentTitle: "Thank you.",
    successMessage:
      "Request received. We will come back with a quote within 24 working hours.",
    errors: {
      name: "Please enter your name.",
      brand: "Please enter your brand name.",
      emailRequired: "Please enter an email address.",
      emailInvalid: "That email address does not look right.",
      service: "Please choose a format.",
      messageShort: "We need at least 20 characters to quote accurately.",
      summary: "A few fields still need filling in.",
    },
  },

  footer: {
    quoteLabel: "Request a quote",
    navigation: "Navigation",
    services: "Services",
    studio: "Studio",
    follow: "Follow",
    rights: "All rights reserved.",
  },

  notFound: {
    metaTitle: "Page not found",
    label: "Error 404",
    title: "This page does not exist.",
    body: "The address may have changed, or the project you are after has been taken out of the portfolio.",
    home: "Back to home",
    works: "View work",
  },
};

export default en;
