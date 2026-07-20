const SYLLABUS = {
  FA: [
    { heading: "Introduction to accounting", topics: ["Nature & purpose of accounting", "Objective of financial accounting", "Elements of financial statements (assets, liabilities, equity, income, expenses)", "The accounting equation", "Users of accounting information"] },
    { heading: "The accounting process", topics: ["Source documents — receipts, invoices", "Books of prime entry — journals, cashbooks, petty cash", "The ledger and double entry concept", "The trial balance", "Preparing financial statements from TB"] },
    { heading: "Regulation & principles", topics: ["Legal sources of regulation", "Professional bodies — ICPAK, IASB, IESBA", "Accounting Standards (IFRSs)", "Accounting concepts — going concern, accruals, consistency", "Qualities of useful financial information (relevance, reliability, comparability)"] },
    { heading: "Assets & liabilities I", topics: ["PPE — IAS 16: cost model, depreciation methods (SL, reducing balance)", "Acquisition, disposal, exchange of PPE", "Intangible assets — IAS 38: recognition, amortisation", "Financial instruments — IFRS 9: definitions & classification only"] },
    { heading: "Assets & liabilities II", topics: ["Inventory — IAS 2: FIFO, weighted average, NRV", "Bank reconciliation statements", "Trade receivables — measurement & credit loss allowance", "Trade payables", "Accrued & prepaid income/expenses"] },
    { heading: "Sole trader financial statements", topics: ["Statement of Profit or Loss", "Statement of Financial Position", "Adjustments — depreciation, bad debts, accruals, prepayments"] },
    { heading: "Partnership financial statements", topics: ["Partnership deed and its provisions", "Statement of P&L and appropriation account", "Partners' capital and current accounts", "Statement of financial position", "Change in profit-sharing ratio, admission, retirement, dissolution"] },
    { heading: "Company financial statements I", topics: ["Types of share capital — ordinary, preference", "Issuing shares — full price, bonus, rights issue", "Reserves and retained profits", "Statement of Profit or Loss and OCI"] },
    { heading: "Company financial statements II", topics: ["Statement of Financial Position", "Statement of Cash Flows — IAS 7 (direct & indirect methods)", "Corporation tax basics in financial statements"] },
    { heading: "Manufacturing & NFP entities", topics: ["Manufacturing statement — prime cost, factory cost, cost of production", "Statement of P&L for manufacturing", "Not-for-profit — income & expenditure account", "SoFP for NFP organisations"] },
    { heading: "Errors & incomplete records", topics: ["Types of errors — omission, commission, principle, compensating", "Correcting errors — journals, suspense account", "Incomplete records — calculating missing figures", "Preparing financial statements from incomplete information"] },
    { heading: "Analysing financial statements", topics: ["Liquidity ratios — current, quick", "Profitability ratios — gross margin, ROCE, net margin", "Efficiency ratios — receivables days, payables days, inventory days", "Solvency ratios — gearing, interest cover", "Investor ratios — EPS, P/E, dividend yield"] },
    { heading: "Public sector accounting", topics: ["Features of public sector vs private sector", "Structure — national, county, state corporations", "Regulation — IPSASB, National Treasury, Director of Accounting Services", "IPSAS overview — cash vs accrual basis", "Budgeting, commitment accounting & fund accounting"] },
    { heading: "FA catch-up & hard topics", topics: ["Revisit cash flow statements (IAS 7) — most common exam area", "Partnership changes — admission/retirement adjustments", "Ratio analysis interpretation questions", "Public sector IPSAS questions"] },
    { heading: "FA past paper practice I", topics: ["Work through one full KASNEB past exam paper (3 hours)", "Attempt all sections — objective & subjective", "Focus on time management — 1.8 min per mark"] },
    { heading: "FA past paper practice II", topics: ["Second full past paper attempt", "Compare answers with marking scheme", "List every topic where marks were dropped"] },
    { heading: "FA past paper review & gaps", topics: ["Rework all questions answered incorrectly", "Consolidate notes on weak areas", "Target: company FS, IAS 7 cash flows, ratio interpretation"] },
    { heading: "FA final deep revision", topics: ["Company financial statements — full question drill", "Cash flow statements — both direct and indirect method", "Key IFRS standards: IAS 2, IAS 7, IAS 16, IAS 38", "Exam technique — read requirements carefully, show workings"] },
  ],
  ECON: [
    { heading: "Introduction to economics", topics: ["Definition and scope of economics", "Scarcity, choice and opportunity cost", "Production possibility curves/frontiers", "Economic systems — planned, free market, mixed", "Methodology — positive vs normative economics"] },
    { heading: "Demand analysis", topics: ["Law of demand and demand schedule", "Price, income and cross elasticity of demand", "Point and arc elasticity measurement", "Factors shifting demand curve", "Applications of elasticity (tax incidence, pricing)"] },
    { heading: "Supply, equilibrium & price controls", topics: ["Law of supply, price elasticity of supply", "Market equilibrium — price and quantity", "Effects of taxes and subsidies on equilibrium", "Maximum and minimum price controls", "Price fluctuations in agricultural markets"] },
    { heading: "Consumer behaviour", topics: ["Cardinal utility — marginal utility, law of DMU", "Ordinal approach — indifference curves and budget line", "Consumer equilibrium and demand curve derivation", "Substitution and income effects — normal, inferior, Giffen goods", "Consumer surplus"] },
    { heading: "Theory of the firm — production", topics: ["Short run — total, average and marginal product", "Law of variable proportions (diminishing returns)", "Long run — isoquants, isocost lines, producer equilibrium", "Demand and supply of labour", "Wage determination, wage differentials, trade unions"] },
    { heading: "Theory of costs & market structures I", topics: ["Short run costs — TC, FC, VC, AC, MC", "Long run costs and economies of scale", "Perfect competition — price, output and profit maximisation", "Monopoly — price, output, economic rent"] },
    { heading: "Market structures II", topics: ["Monopolistic competition — short and long run", "Oligopoly — interdependence, kinked demand curve", "Mathematical approach to profit maximisation", "Comparison of market structures — efficiency implications"] },
    { heading: "National income", topics: ["GDP, GNP, NNP, NNI — concepts and differences", "Circular flow of income (2, 3 & 4 sector)", "Methods of measuring national income — output, income, expenditure", "Consumption, savings, investment — multiplier and accelerator", "Business cycles and inflationary/deflationary gaps"] },
    { heading: "Economic growth & development", topics: ["Difference between growth and development", "Actual vs potential growth", "Characteristics of developing countries", "Obstacles to economic development", "Development planning — short, medium and long term"] },
    { heading: "Money & banking", topics: ["Nature and functions of money", "Demand for money — quantity theory, Keynesian liquidity preference", "Commercial banks — credit creation, money multiplier", "Central bank — functions and role of CBK", "Classical theory of interest rate determination"] },
    { heading: "Monetary policy & IS-LM", topics: ["Monetary policy — objectives, instruments, limitations", "Interest rates and effects on investment, output, inflation", "Harmonisation of fiscal and monetary policy", "Simple IS-LM model — derivation and equilibrium", "Partial and general equilibrium"] },
    { heading: "Inflation & unemployment", topics: ["Types and causes of inflation — demand pull, cost push", "Effects and control measures for inflation", "Types and causes of unemployment", "Phillips curve — inflation-unemployment trade-off", "Role of agriculture and industry in development"] },
    { heading: "Agriculture & industry", topics: ["Role of agriculture in economic development", "Challenges facing agricultural sector in developing countries", "Policies to improve agricultural sector", "Role and benefits of industry — especially small scale", "Obstacles and policies for industrial development"] },
    { heading: "International trade & finance", topics: ["Absolute and comparative advantage", "WTO and concerns of developing countries", "Balance of payments — current, capital, financial accounts", "Exchange rate systems — fixed, floating, managed", "IMF, World Bank, foreign debt management", "Structural Adjustment Programmes — impacts on LDCs"] },
  ],
  LAW: [
    { heading: "Nature, purpose & classification of law", topics: ["Meaning and nature of law", "Classification — public/private, criminal/civil", "The Constitution as supreme law", "Legislation, delegated legislation", "Common law, equity, judicial precedent", "African customary law, Islamic law"] },
    { heading: "Administrative law & court system", topics: ["Doctrine of separation of powers", "Principles of natural justice", "Judicial control of the executive", "Court hierarchy — Supreme Court to Magistrate", "Employment & Labour, Environmental & Land courts", "Distinction between courts and tribunals"] },
    { heading: "Alternative dispute resolution", topics: ["Negotiation, conciliation, mediation", "Arbitration — process and legal framework", "Dispute Review Boards", "Traditional dispute resolution mechanisms", "ADR vs litigation — advantages and disadvantages"] },
    { heading: "Law of persons & tort", topics: ["Natural vs artificial persons", "Incorporated vs unincorporated associations", "Negligence — elements, defences", "Defamation — libel and slander", "Trespass to person, land and goods", "Remedies in tort — damages, injunction"] },
    { heading: "Law of contract I", topics: ["Essentials of a valid contract — offer, acceptance, consideration, intention", "Classification of contracts", "Terms — conditions, warranties, innominate terms", "Exemption clauses — incorporation and effect", "Vitiating factors — mistake, misrepresentation, duress, undue influence"] },
    { heading: "Law of contract II", topics: ["Discharge of contract — performance, agreement, frustration, breach", "Remedies for breach — damages (types), specific performance, injunction", "Limitation of actions", "IT and the law of contract — electronic contracts"] },
    { heading: "Sale of goods & agency", topics: ["Nature of sale of goods contract", "Implied terms — title, description, quality, fitness, sample", "Rights and duties of buyer and seller", "Remedies for breach — price, damages, rejection", "Types of agents — actual, apparent/ostensible authority", "Rights, duties and termination of agency"] },
    { heading: "Partnership & indemnity/guarantees", topics: ["Partnership — formation, types (general, limited)", "Rights, duties and liabilities of partners", "Dissolution of partnerships and consequences", "Contract of indemnity vs contract of guarantee", "Obligations and discharge of surety", "Letters of credit"] },
    { heading: "Insurance & negotiable instruments", topics: ["Principles of insurance — insurable interest, utmost good faith, indemnity, subrogation", "Types of insurance", "Cheques — types, crossings, dishonour", "Bills of exchange and promissory notes", "Banker-customer relationship", "Modes of discharge and criminal liability"] },
    { heading: "Law of property", topics: ["Classification — real/personal, movable/immovable, tangible/intangible", "Land law — private, public, community land", "Interests in land — estates, servitudes, encumbrances", "Intellectual property — patents, trademarks, copyrights", "Transfer of land rights, sectional properties"] },
    { heading: "Corporate governance", topics: ["Definition and principles of corporate governance", "Best practices — board composition, independence, transparency", "Role of stakeholders — shareholders, board, government", "Conflict of interest and investor protection", "Compliance obligations and legal audit"] },
    { heading: "Professional ethics", topics: ["Fundamental principles — integrity, objectivity, confidentiality, competence", "Professional misconduct — categories and consequences", "Ethics for accountants — ICPAK code of ethics", "Ethics and practice within a firm", "Enforcement of professional ethics"] },
    { heading: "Law past paper practice", topics: ["Work through one full KASNEB Law past paper", "Focus on contract law questions (highest mark weight)", "Tort and agency questions — common exam areas", "Practice writing structured legal answers"] },
    { heading: "Law past paper review", topics: ["Mark answers against scheme", "Identify missed legal rules and cases", "Revise sections with dropped marks", "Consolidate notes on high-mark topics"] },
  ],
  QA: [
    { heading: "Mathematical functions", topics: ["Linear, quadratic, cubic, exponential, logarithmic functions", "Equations, inequalities and graphs", "Application to business — break-even, revenue, cost functions", "Solving simultaneous equations"] },
    { heading: "Matrix algebra", topics: ["Types of matrices and operations (+, -, ×, transpose)", "Inversion of matrices up to order 3×3", "Determinants — cofactor and adjoint method", "Markov analysis and input-output analysis", "Solving systems of equations using matrices"] },
    { heading: "Differentiation", topics: ["General rule, chain rule, product rule, quotient rule", "Differentiation of exponential and logarithmic functions", "Turning points — maxima, minima, points of inflexion", "Applications — marginal cost, marginal revenue, profit maximisation"] },
    { heading: "Integration", topics: ["General rules of integration", "Integration of exponential and logarithmic functions", "Definite vs indefinite integrals", "Applications — area under curve, consumer surplus, total cost from MC"] },
    { heading: "Descriptive statistics", topics: ["Measures of central tendency — arithmetic mean, geometric mean, harmonic mean, median, mode", "Measures of dispersion — range, mean deviation, standard deviation, CV", "Quartiles, deciles, percentiles", "Skewness — Pearson's coefficient", "Kurtosis — leptokurtic, platykurtic, mesokurtic"] },
    { heading: "Set theory & probability", topics: ["Set operations — union, intersection, complement, difference", "Venn diagrams (up to 3 sets)", "Types of events — mutually exclusive, independent, exhaustive", "Additive and multiplicative laws of probability", "Conditional probability and Bayes' theorem", "Probability trees and expected value"] },
    { heading: "Probability distributions", topics: ["Binomial distribution — formula, mean, variance", "Poisson distribution — applications in quality control", "Normal distribution — Z scores, standard normal table", "t-distribution and chi-square distribution", "Applications to business decision making"] },
    { heading: "Hypothesis testing", topics: ["Null and alternative hypotheses — one and two-tailed tests", "Type I and Type II errors", "Z-tests and t-tests on means and proportions", "Chi-square test — goodness of fit and independence", "Using R statistical software for hypothesis tests"] },
    { heading: "Correlation & regression", topics: ["Scatter diagrams — interpretation", "Pearson product-moment correlation coefficient", "Spearman rank correlation coefficient", "Simple linear regression — least squares method", "Multiple linear regression — interpretation of output", "Coefficient of determination R²"] },
    { heading: "Time series", topics: ["Components — trend, seasonal, cyclical, irregular", "Methods of fitting trend — freehand, semi-averages, moving averages, least squares", "Additive and multiplicative models", "Measuring seasonal variation", "Forecasting — moving averages, OLS, exponential smoothing"] },
    { heading: "Linear programming", topics: ["Decision variables, objective function, constraints", "Assumptions of linear programming", "Graphical method — feasible region, corner points, iso-profit lines", "Simplex method — tableau setup, pivot operations", "Sensitivity analysis basics"] },
    { heading: "Decision theory", topics: ["Decision environments — certainty, risk, uncertainty", "Expected monetary value (EMV) and expected opportunity loss (EOL)", "Expected value of perfect information (EVPI)", "Decision trees — sequential decisions, EVSI", "Maximin, maximax, minimax regret, Hurwicz, Laplace criteria"] },
    { heading: "QA past paper practice I", topics: ["Work through one full KASNEB QA past paper", "Focus on compulsory sections — statistics and probability", "Mathematical functions and matrix questions"] },
    { heading: "QA past paper practice II", topics: ["Second full past paper attempt", "Focus on LP, decision theory, time series", "Mark and identify weak topics"] },
    { heading: "QA gap review", topics: ["Targeted revision based on past paper gaps", "Most common weak areas: integration, matrix inversion, hypothesis testing", "Rework all dropped-mark questions"] },
    { heading: "QA final exam drill", topics: ["Timed drill — 10 questions across all topics", "LP graphical method under time pressure", "Normal distribution and Z-score calculations", "Decision tree questions — step by step methodology"] },
  ]
};

const SUBJECTS_META = {
  FA: { label: "Financial Accounting", paper: "P1", days: 6, desc: "Accounting process, financial statements, IFRSs, ratio analysis, public sector" },
  ECON: { label: "Economics", paper: "P4", days: 5, desc: "Micro & macroeconomics, national income, monetary policy, international trade" },
  LAW: { label: "Introduction to Law", paper: "P3", days: 5, desc: "Legal system, contract law, tort, agency, corporate governance, ethics" },
  QA: { label: "Quantitative Analysis", paper: "P5", days: 6, desc: "Calculus, statistics, probability, regression, LP, decision theory" },
};

// ── COMPRESSED SCHEDULE: Jul 20 – Aug 19, 2026 (exam Aug 23–24) ──
// 30 days · 4 Sundays off · 27 study days
// Phase 1 (Jul 20–Aug 1): First pass all subjects
// Phase 2 (Aug 3–15): Deep dive + past papers + mocks
// Final (Aug 17–19): Light revision before exam

const SCHEDULE = [
  {
    phase: "Phase 1",
    title: "First Pass",
    dates: "Jul 20 – Aug 1",
    weeks: [
      // Week 1: Mon Jul 20 – Sun Jul 26
      { title: "Week 1", dates: "Jul 20 – 26", days: [
        { s:"FA",   t:0,  h:"1.5h" },  // Mon Jul 20 — Intro to accounting
        { s:"FA",   t:1,  h:"1.5h" },  // Tue Jul 21 — Accounting process
        { s:"ECON", t:0,  h:"1.5h" },  // Wed Jul 22 — Intro to economics
        { s:"ECON", t:1,  h:"1.5h" },  // Thu Jul 23 — Demand analysis
        { s:"LAW",  t:0,  h:"1.5h" },  // Fri Jul 24 — Nature of law
        { s:"QA",   t:0,  h:"4h"   },  // Sat Jul 25 — Mathematical functions
        { s:"REST", t:-1, h:""     },  // Sun Jul 26
      ]},
      // Week 2: Mon Jul 27 – Sun Aug 2
      { title: "Week 2", dates: "Jul 27 – Aug 2", days: [
        { s:"LAW",  t:1,  h:"1.5h" },  // Mon Jul 27 — Admin law & courts
        { s:"QA",   t:1,  h:"1.5h" },  // Tue Jul 28 — Matrix algebra
        { s:"QA",   t:2,  h:"1.5h" },  // Wed Jul 29 — Differentiation
        { s:"FA",   t:2,  h:"1.5h" },  // Thu Jul 30 — Regulation & principles
        { s:"FA",   t:3,  h:"1.5h" },  // Fri Jul 31 — Assets & liabilities I
        { s:"ECON", t:2,  h:"4h"   },  // Sat Aug 1  — Supply, equilibrium
        { s:"REST", t:-1, h:""     },  // Sun Aug 2
      ]},
    ]
  },
  {
    phase: "Phase 2",
    title: "Deep Dive & Mocks",
    dates: "Aug 3 – Aug 15",
    weeks: [
      // Week 3: Mon Aug 3 – Sun Aug 9
      { title: "Week 3", dates: "Aug 3 – 9", days: [
        { s:"QA",   t:3,  h:"1.5h" },  // Mon Aug 3  — Integration
        { s:"QA",   t:4,  h:"1.5h" },  // Tue Aug 4  — Descriptive stats
        { s:"FA",   t:4,  h:"1.5h" },  // Wed Aug 5  — Assets & liabilities II
        { s:"FA",   t:5,  h:"1.5h" },  // Thu Aug 6  — Sole trader FS
        { s:"ECON", t:3,  h:"1.5h" },  // Fri Aug 7  — Consumer behaviour
        { s:"LAW",  t:2,  h:"4h"   },  // Sat Aug 8  — ADR & courts deep dive
        { s:"REST", t:-1, h:""     },  // Sun Aug 9
      ]},
      // Week 4: Mon Aug 10 – Sun Aug 16
      { title: "Week 4", dates: "Aug 10 – 16", days: [
        { s:"REV",  sub:"FA",   t:6,  h:"1.5h" },  // Mon Aug 10 — Rev: FA hard topics
        { s:"REV",  sub:"QA",   t:5,  h:"1.5h" },  // Tue Aug 11 — Rev: Probability
        { s:"REV",  sub:"ECON", t:4,  h:"1.5h" },  // Wed Aug 12 — Rev: Theory of firm
        { s:"REV",  sub:"LAW",  t:3,  h:"1.5h" },  // Thu Aug 13 — Rev: Contract law
        { s:"MOCK", sub:"FA",   t:-2, h:"1.5h" },  // Fri Aug 14 — Mock: FA
        { s:"MOCK", sub:"QA",   t:-2, h:"4h"   },  // Sat Aug 15 — Mock: QA
        { s:"REST", t:-1, h:""     },  // Sun Aug 16
      ]},
    ]
  },
  {
    phase: "Phase 3",
    title: "Final Revision",
    dates: "Aug 17 – 19",
    weeks: [
      // Week 5 partial: Mon Aug 17 – Wed Aug 19
      { title: "Final Days", dates: "Aug 17 – 19", days: [
        { s:"REV",  sub:"FA",   t:7,  h:"1.5h" },  // Mon Aug 17 — FA final drill
        { s:"REV",  sub:"ECON", t:4,  h:"1.5h" },  // Tue Aug 18 — Econ + Law key topics
        { s:"REST", t:-1, h:""     },  // Wed Aug 19 — Rest before exam week
        { s:"REST", t:-1, h:""     },  // Thu (placeholder — exam prep)
        { s:"REST", t:-1, h:""     },  // Fri (placeholder)
        { s:"REST", t:-1, h:""     },  // Sat (placeholder)
        { s:"REST", t:-1, h:""     },  // Sun (placeholder)
      ]},
    ]
  }
];

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const LABELS = { FA:"Fin. Acc", ECON:"Econ", LAW:"Law", QA:"Quant", REV:"Revision", MOCK:"Mock", REST:"Rest", EXAM:"Exam" };
const CELL_CLS = { FA:"day-fa", ECON:"day-econ", LAW:"day-law", QA:"day-qa", REV:"day-rev", MOCK:"day-mock", REST:"day-rest", EXAM:"day-exam" };
const TAG_CLS = { FA:"fa", ECON:"econ", LAW:"law", QA:"qa", REV:"rev", MOCK:"mock", REST:"rest", EXAM:"exam" };
