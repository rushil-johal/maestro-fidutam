'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';


const lessons = [
  { id: 1, title: 'Lesson 1: Learn to count in Igbo', videoIds: ['videoId1', 'videoId2', 'videoId3'] },
  { id: 2, title: 'Lesson 2: Learn to say your name in Igbo', videoIds: ['videoId4', 'videoId5', 'videoId6'] },
  { id: 3, title: 'Lesson 3: Igbo Alphabet and Pronunciation', videoIds: ['videoId7, video8', 'videoId9'] },
  { id: 4, title: 'Lesson 4: Common Phrases and Greetings in Igbo', videoIds: ['videoId10, video11', 'videoId12'] },
  { id: 5, title: 'Lesson 5: Learn Animals in Igbo', videoIds: ['videoId13, videoId14', 'videoId15'] },
  { id: 6, title: 'Lesson 6: Igbo Grammar Basics', videoIds: ['videoId16, videoId17', 'videoId18'] },
  { id: 7, title: 'Lesson 7: Conversational Igbo', videoIds: ['videoId19, videoId20', 'videoId21'] },
  { id: 8, title: 'Lesson 8: Igbo Culture and Traditions', videoIds: ['videoId22, videoId23', 'videoId24'] },
  // ... other lessons
];

export default function CourseDashboard() {
  const [selectedLesson, setSelectedLesson] = useState(lessons[0]);

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  return (
    <>
      <Head>
        <title>Create New Path</title>
      </Head>
      <div className="flex flex-col h-screen bg-black text-white">

        <nav className="flex justify-between items-center p-4">
          <Link href="/" passHref>
            <div className="p-4">
              <Image
                src="/fidulogo.png"
                alt="Fidu logo"
                width={80}
                height={80}
                className="font-beatriceFont"
              />
            </div>
          </Link>
          <h1 className="text-4xl font-beatriceFont font-medium text-white">Course Dashboard</h1>

          <div className="space-x-8">
            {/* Apply the Beatrice font using the class you created */}
            <button
              className="text-xl font-medium font-beatriceFont hover:underline"
              style={{ textDecorationColor: '#e8d28b' }}
            >
              App
            </button>
            <button
              className="text-xl font-medium font-beatriceFont hover:underline"
              style={{ textDecorationColor: '#e8d28b' }}
            >
              Slack
            </button>
            <button
              className="text-xl font-medium font-beatriceFont hover:underline"
              style={{ textDecorationColor: '#e8d28b' }}
            >
              Feedback
            </button>
          </div>
        </nav>

        <div className="flex h-screen">
          <aside className="w-1/4 bg-black text-white">
            <ul>
              {lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  onClick={() => handleLessonClick(lesson)}
                  className={`p-4 cursor-pointer font-beatriceFont ${selectedLesson.id === lesson.id ? 'bg-[#e8d28b] rounded-xl text-[#1f2937]' : 'hover:bg-[#334155] rounded-xl'}`}
                >
                  {lesson.title}
                </li>
              ))}

              <div className="p-4 flex flex-row md-2 items-start">
              <Link href="/create-path" passHref>
                <button className="text-black mt-24 text-xl font-medium font-beatriceFont bg-[#e8d28b] p-2 rounded-lg mb-2 mr-4">
                  + New Path
                </button>
                <Link href="/create-path" passHref></Link>
                <button className="text-black mt-24 text-xl font-medium font-beatriceFont md-8 bg-[#e8d28b] p-2 rounded-lg">
                  Regenerate Path ↔︎
                </button>
                </Link>
              </div>
            </ul>
          </aside>,
          <section className="w-3/4 bg-[#fdf3db] rounded-3xl overflow-auto">
  <div className="flex justify-between items-start p-4">
    <div className="flex-grow">
      <h2 className="text-2xl font-bold font-beatriceFont rounded-lg text-[#1f2937]">
        {selectedLesson.title}
      </h2>
      {/* Content including YouTube videos */}
      <div className="overflow-auto max-h-screen">
        {selectedLesson.videoIds.map((videoId) => (
          <iframe
            key={videoId}
            width="960"
            height="515"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={selectedLesson.title}
            frameBorder="9"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="mb-4"
          ></iframe>
        ))}
      </div>
    </div>
    <button className="text-black text-xl font-medium font-beatriceFont bg-[#e8d28b] p-2 rounded-lg mt-4">
      Mark as Complete ✓
    </button>
  </div>
</section>
        </div>
      </div>
    </>
  );
}
