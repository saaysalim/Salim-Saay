import React from "react";

type Publication = {
  title: string;
  authors: string;
  journal?: string;
  conference?: string;
  book?: string;
  thesis?: string;
  institution?: string;
  citedBy?: number;
  year?: number;
};

const publications: Publication[] = [
  {
    title: "An architecture for e-learning infrastructures on a national level: a case study of the Afghanistan Research and Education Network",
    authors: "S Saay, A Norta",
    journal: "International Journal of Innovation and Learning 23 (1), 54-75",
    citedBy: 22,
    year: 2018,
  },
  {
    title: "Challenges in the implementation of e-learning in Afghanistan higher education",
    authors: "MS Oryakhail, S Saay, H Nasery",
    conference: "2021 international conference advancement in data science, e-learning and ...",
    citedBy: 11,
    year: 2021,
  },
  {
    title: "Xmdd as key enabling technology for integration of large scale elearning based on nrens",
    authors: "S Saay, T Margaria",
    conference: "2020 IEEE 20th International Conference on Advanced Learning Technologies ...",
    citedBy: 9,
    year: 2020,
  },
  {
    title: "A REFERENCE ARCHITECTURE FOR A NATIONAL E-LEARNING INFRASTRUCTURE",
    authors: "S Saay",
    institution: "Tallinn University, Estonia",
    citedBy: 9,
    year: 2018,
  },
  {
    title: "Model-driven-design of NREn bridging application: case study AfgREN",
    authors: "S Saay, T Margaria",
    conference: "2020 IEEE 44th Annual Computers, Software, and Applications Conference ...",
    citedBy: 6,
    year: 2020,
  },
  {
    title: "Requirements for e-testing services in the AfgREN cloud-based e-learning system",
    authors: "S Saay, M Laanpere, A Norta",
    conference: "International Computer Assisted Assessment Conference, 133-147",
    citedBy: 6,
    year: 2016,
  },
  {
    title: "Towards an architecture for e-learning infrastructures on a national level: a case study of AfgREN",
    authors: "S Saay, A Norta, M Laanpere",
    conference: "International Conference on Web-Based Learning, 98-107",
    citedBy: 6,
    year: 2015,
  },
  {
    title: "Designing a scalable socio-technical method for evaluating large e-governance systems",
    authors: "S Saay, A Norta",
    book: "Advanced Computational and Communication Paradigms: Proceedings of ...",
    citedBy: 4,
    year: 2018,
  },
  {
    title: "Sustainability of National Research and Educational Networks (NRENs) in developing countries",
    authors: "S Saay",
    thesis: "Phd. dissertation, Institute of informatics, Tallinn University, Tallinn ...",
    citedBy: 4,
    year: 2014,
  },
  {
    title: "AI-Driven Smart Shopping Carts With Real-Time Tracking and Inventory Forecasting for Enhanced Retail Efficiency",
    authors: "A Khalid, MI Zulfiqar, A Siddig, MJ Nawaz, S Saay",
    journal: "IEEE Access",
    citedBy: 3,
    year: 2025,
  },
  {
    title: "XMDD as Key Enabling Technology for Integration and Organizational Collaboration: Application to E-Learning Based on NRENs",
    authors: "S Saay, T Margaria",
    journal: "Advances in Science, Technology and Engineering Systems Journal 6 (3), 213-230",
    citedBy: 2,
    year: 2021,
  },
  {
    title: "Toward authentication mechanisms for Wi-Fi mesh networks",
    authors: "MS Saay",
    thesis: "University of the Western Cape",
    citedBy: 2,
    year: 2011,
  },
  {
    title: "Diagrams as Visual Knowledge Communication Tools in Interdisciplinary Postgraduate Education",
    authors: "S Saay, S O’Brien, A Singh, A De Götzen, V Voronova, T Margaria",
    conference: "2025 IEEE 49th Annual Computers, Software, and Applications Conference ...",
    year: 2025,
  },
  {
    title: "Flipped-classroom Based Teaching Method for Data Structures and Algorithms",
    authors: "S Saay, T Margaria",
    conference: "2025 IEEE 49th Annual Computers, Software, and Applications Conference ...",
    year: 2025,
  },
  {
    title: "Requirements for an international educational collaboration system architecture, a case study: Coláiste Nano Nagle School in Limerick, Ireland, and Irshad High School in Kabul ...",
    authors: "S Saay, A Norta",
    conference: "2023 IEEE 47th Annual Computers, Software, and Applications Conference ...",
    year: 2023,
  },
  {
    title: "Challenges in the implementation of E-Learning in Afghanistan Higher Education",
    authors: "MSOSS Salim Saay",
    conference: "2021 International Conference Advancement in Data Science, E-learning and ...",
    year: 2022,
  },
  {
    title: "Obstacles for integration of e-learning in higher education in Afghanistan Case study Paktia University",
    authors: "MK Salim Saay",
    journal: "International Journal of Research in Advanced Engineering and Technology 5 ...",
    year: 2019,
  },
  {
    title: "AUTHENTICATION MECHANISM FOR WI-FI MESH NETWORK FRAGMENTATION",
    authors: "MS Saay",
    thesis: "University of the Western Cape",
    year: 2008,
  },
  {
    title: "Requirements for e-test services in the AfgREN cloud-based e-learning",
    authors: "S Saay, M Laanpere, A Norta",
  },
];

export const Publications: React.FC = () => {
  return (
    <section className="container mx-auto py-8">
      <h2 className="text-4xl font-extrabold mb-8 text-center">Publications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {publications.map((pub, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-2 text-blue-800">{pub.title}</h3>
            <div className="mb-1"><span className="font-medium text-gray-700">Authors:</span> {pub.authors}</div>
            {pub.journal && <div className="mb-1"><span className="font-medium text-gray-700">Journal:</span> {pub.journal}</div>}
            {pub.conference && <div className="mb-1"><span className="font-medium text-gray-700">Conference:</span> {pub.conference}</div>}
            {pub.book && <div className="mb-1"><span className="font-medium text-gray-700">Book:</span> {pub.book}</div>}
            {pub.thesis && <div className="mb-1"><span className="font-medium text-gray-700">Thesis:</span> {pub.thesis}</div>}
            {pub.institution && <div className="mb-1"><span className="font-medium text-gray-700">Institution:</span> {pub.institution}</div>}
            {pub.citedBy && <div className="mb-1"><span className="font-medium text-gray-700">Cited by:</span> {pub.citedBy}</div>}
            {pub.year && <div className="mb-1"><span className="font-medium text-gray-700">Year:</span> {pub.year}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};
