#import "./resume.typ": *

// Personal Information 
#let name = "Armin Rezaiyan-Nojani"
#let email = "arminrez@terpmail.umd.edu"
#let github = "github.com/ArminRezz"
#let linkedin = "linkedin.com/in/arminrezaiyan"
#let phone = "+1 (301) 887-7747"
#let personal-site = "arminr.com"

#show: resume.with(
  author: name,
  email: email,
  github: github,
  linkedin: linkedin,
  phone: phone,
  personal-site: personal-site,
  accent-color: "#111111",
  font: "New Computer Modern",
  paper: "us-letter",
  author-position: left,
  personal-info-position: left,
)

== Education

#edu(
  institution: "University of Maryland, College Park",
  location: "College Park, MD",
  dates: dates-helper(start-date: "Jan 2024", end-date: "May 2026"),
  degree: "Bachelor's of Science, Computer Science", 
)
- GPA: 3.3\/4.0
- Clubs: Terps Racing
- Relevant Coursework: Computer Systems, Computer Networks & Security, Data Structures, Algorithms, Programming Language Theory, Artificial Intelligence, Data Science, Discrete Mathematics, Statistics & Probability, Calculus I/II, Linear Algebra 

#edu(
  institution: "Thomas S. Wootton High School",
  location: "Rockville, MD",
  dates: dates-helper(start-date: "Sep 2019", end-date: "May 2023"),
  degree: "High School Diploma", 
)
- Varsity Soccer (4 years), Montgomery College Early College Program 

== Work Experience

#work(
  title: "Research and Development Engineer Intern",
  location: "Colorado Springs, CO",
  company: "Auria",
  dates: dates-helper(start-date: "May 2025", end-date: "Present"),
)
- Designed and deployed AI agents for satellite mission planning, enabling industry-specific workflows.
- Built a data pipeline with C\# and Python to extract satellite data, enabling seamless ingestion by the agent.
- Led evaluation and adoption of AWS Bedrock, MCP integration, and driving production rollout.
- Co-authored a SmallSat 2025 publication on closed-loop tasking workflows with conversational agents.

#work(
  title: "Software Developer Intern",
  location: "Silver Spring, MD",
  company: "Vortex Vector",
  dates: dates-helper(start-date: "Jun 2024", end-date: "Sep 2024"),
)
- Built a hardware compatibility engine to automate component matching for custom glass assemblies.
- Designed a DynamoDB schema, unifying fragmented hardware catalogs across manufacturers.
- Utilize Python data parsers to extract, normalize, and filter product attributes for system integration.
- Accelerated design workflows by standardizing hardware selection and reducing manual lookup time for engineers.

#work(
  title: "Machine Learning Intern",
  location: "Greenbelt, MD",
  company: "NASA",
  dates: dates-helper(start-date: "Jun 2023", end-date: "Aug 2023"),
)
- Built a vector database and knowledge graph to improve discoverability of NASA’s GES DISC archives.
- Linked PDF metadata and datasets using semantic embeddings for context-aware search.
- Integrated Neo4j relationships to enhance retrieval of related scientific materials.
- Benchmarked and published results at AGU 2023

#work(
  title: "Machine Learning Intern",
  location: "Greenbelt, MD",
  company: "NASA",
  dates: dates-helper(start-date: "Jun 2022", end-date: "Aug 2022"),
)
- Built an XGBoost Learning-to-Rank model to improve dataset relevance in NASA’s GES DISC search engine
- Processed 230K+ user logs in Python to create training datasets and judgment lists.
- Engineered ranking features, boosting nDCG from 0.36 to 0.81.
- Delivered a prototype model and data pipeline adopted for future search-ranking research.

== Publications
#bibliography("refs.bib", full: true, style: "ieee", title: none)

== Skills
- Languages: Python, C++, C\#, TypeScript, SQL, HTML/CSS, Assembly (MIPS, x86)
- Full-Stack/Cloud Development: React, Node.js, Express, MongoDB, PostgreSQL, REST APIs, Docker, AWS (S3, Lambda, DynamoDB)
- AI & Data Systems: Pandas, scikit-learn, NumPy, Pytorch, Neo4j, Weaviate/Pinecone, LangChain/LangGraph, Strands, AWS Bedrock

/**
*
- *Languages*: Python, C++, C\#, TypeScript, SQL, HTML/CSS, Assembly (MIPS, x86) 
- *Technologies*: React, LangChain, PyTorch, scikit-learn, pandas, NumPy, Docker, AWS (S3, Lambda, Bedrock, DynamoDB), Neo4j
*/
