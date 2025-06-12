'use client';

import React, { useState, useEffect } from 'react';

export default function YTVideoDisplayTest() {
    const [lessons, setLessons] = useState([]); // Assume lessons is an array of objects with videoId

    useEffect(() => {
        // Fetch lessons from your API and set them in state
        // setLessons(fetchedLessons);
    }, []);

    return (
        <div>
            <h1>YouTube Video Display Test</h1>
            {lessons.map((lesson, index) => (
                <div key={index}>
                    <h2>{lesson.title}</h2>
                    {lesson.videoId && (
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${lesson.videoId}`}
                            title={`YouTube video player - ${lesson.title}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                </div>
            ))}
        </div>
    );
}




// 'use client';

// import Head from 'next/head';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import Image from 'next/image';

// export default function CourseDashboard() {
//   const [lessons, setLessons] = useState([]);
//   const [selectedLesson, setSelectedLesson] = useState(null);

//   useEffect(() => {
//     function fetchCourseOutline() {
//       const storedResponse = sessionStorage.getItem('openAIResponse');
//       if (storedResponse) {
//         const parsedLessons = parseGPTResponseToLessons(storedResponse);
//         setLessons(parsedLessons);
//         if (parsedLessons.length > 0) {
//           setSelectedLesson(parsedLessons[0]);
//         }
//       }
//     }

//     fetchCourseOutline();
//   }, []);

//   // function parseGPTResponseToLessons(gptResponse) {
//   //   if (typeof gptResponse !== 'string' || gptResponse.trim().length === 0) {
//   //       return [];
//   //   }

//   //   const lessons = [];
//   //   const lessonSections = gptResponse.split('Lesson').slice(1); // Split and ignore the first empty entry

//   //   lessonSections.forEach((section, index) => {
//   //       const sectionParts = section.split('YouTube References:');
//   //       const lessonContent = sectionParts[0].trim();
//   //       const lessonTitle = `Lesson ${lessonContent.split('\n')[0].trim()}`;
//   //       const summary = lessonContent.split('\n').slice(1).join('\n').trim();

//   //       let videoUrls = [];
//   //       if (sectionParts.length > 1) {
//   //           const videoLinks = sectionParts[1].trim();
//   //           videoUrls = videoLinks.split('\n')
//   //                                .filter(link => link.includes('youtube.com'))
//   //                                .map(url => url.trim());
//   //       }

//   //       lessons.push({ id: index + 1, title: lessonTitle, summary, videoUrls });
//   //   });

//   //   return lessons;

//   function parseGPTResponseToLessons(gptResponse) {
//     if (typeof gptResponse !== 'string' || gptResponse.trim().length === 0) {
//       return [];
//     }

//     const lessons = [];
//     let currentLesson = null;
//     const lines = gptResponse.split('\n').filter(line => line.trim().length > 0);

//     lines.forEach((line, index) => {
//       if (line.startsWith('Lesson')) {
//         if (currentLesson) {
//           lessons.push(currentLesson);
//         }
//         currentLesson = { id: index + 1, title: line, summary: '', articleLinks: [] };
//       } else if (line.startsWith('http') && currentLesson) {
//         currentLesson.articleLinks.push(line.trim());
//       } else if (currentLesson) {
//         currentLesson.summary += line + '\n';
//       }
//     });

//     if (currentLesson) {
//       lessons.push(currentLesson);
//     }

//     return lessons;
//   }


//   const handleLessonClick = (lesson) => {
//     setSelectedLesson(lesson);
//   };



//   if (!selectedLesson) return <p>Loading course outline...</p>;


//   return (
//     <>
//       <Head>
//         <title>Course Dashboard</title>
//       </Head>
//       <div className="flex flex-col h-screen bg-black text-white">

//         {/* Navigation Bar */}
//         <nav className="flex justify-between items-center p-4">
//           <Link href="/" passHref>
//             <div className="p-4">
//               <Image src="/fidulogo.png" alt="Fidu logo" width={80} height={80} className="font-beatriceFont" />
//             </div>
//           </Link>
//           <h1 className="text-4xl font-beatriceFont font-medium text-white">Course Dashboard</h1>
//           <div className="space-x-8">
//             <button className="text-xl font-medium font-beatriceFont hover:underline" style={{ textDecorationColor: '#e8d28b' }}>App</button>
//             <button className="text-xl font-medium font-beatriceFont hover:underline" style={{ textDecorationColor: '#e8d28b' }}>Slack</button>
//             <button className="text-xl font-medium font-beatriceFont hover:underline" style={{ textDecorationColor: '#e8d28b' }}>Feedback</button>
//           </div>
//         </nav>


//         {/* Main Content */}
//         <div className="flex h-screen">
//           <aside className="w-1/4 bg-black text-white">
//             <ul>
//               {
//                 lessons.map((lesson) => (
//                   <li
//                     key={lesson.id}
//                     onClick={() => handleLessonClick(lesson)}
//                     className={`p-4 cursor-pointer font-beatriceFont ${selectedLesson && selectedLesson.id === lesson.id
//                       ? 'bg-[#e8d28b] rounded-xl text-[#1f2937]'
//                       : 'hover:bg-[#334155] rounded-xl'
//                       }`}
//                   >
//                     {lesson.title}
//                   </li>


//                 ))}
//             </ul>

//             <div className="p-4 flex flex-row md-2 items-start">
//               <Link href="/create-path" passHref>
//                 <button className="text-black mt-24 text-xl font-medium font-beatriceFont bg-[#e8d28b] p-2 rounded-lg mb-2 mr-4">
//                   + New Path
//                 </button>
//                 <Link href="/create-path" passHref></Link>
//                 <button className="text-black mt-24 text-xl font-medium font-beatriceFont md-8 bg-[#e8d28b] p-2 rounded-lg">
//                   Regenerate Path ↔︎
//                 </button>
//               </Link>
//             </div>
//           </aside>

//           <section className="w-3/4 bg-[#fdf3db] rounded-3xl overflow-auto">
//             <div className="flex justify-between items-start p-4">
//               <div className="flex-grow">
//                 <h2 className="text-2xl font-bold font-beatriceFont rounded-lg text-[#1f2937]">
//                   {selectedLesson.title}
//                 </h2>
//                 <div className="overflow-auto mt-8 text-black text-xl font-medium font-beatriceFont max-h-screen">
//                   <ul className="list-disc pl-5">
//                     {selectedLesson.summary.split('\n').map((point, index) => (
//                       <li key={index} className="mb-3">
//                         {point}
//                       </li>
//                     ))}
//                   </ul>
//                   {/* YouTube iframes */}

//                   {
//                     selectedLesson.articleLinks.map((link, index) => (
//                       <iframe
//                         key={index}
//                         src={link}
//                         width="100%"
//                         height="600" // You can adjust this
//                         frameBorder="0"
//                         allowFullScreen
//                         className="mb-4"
//                         title={`Article - ${index + 1}`}
//                       ></iframe>
//                     ))
//                   }

//                 </div>
//               </div>
//               <button className="text-black text-xl font-medium font-beatriceFont bg-[#e8d28b] p-2 rounded-lg mt-4">
//                 Mark as Complete ✓
//               </button>
//             </div>
//           </section>
//         </div>
//       </div>
//     </>
//   );
// }
