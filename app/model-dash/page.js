'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { FaReact, FaBookOpen, FaBrain } from 'react-icons/fa';

export default function CourseDashboard() {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    async function fetchCourseOutline() {
      const storedResponse = sessionStorage.getItem('openAIResponse');
      if (storedResponse) {
        try {
          const parsedLessons = await parseAndFetchLessons(storedResponse);
          setLessons(parsedLessons);
          if (parsedLessons.length > 0) {
            setSelectedLesson(parsedLessons[0]);
          }
        } catch (error) {
          console.error('Error in fetchCourseOutline:', error);
        }
      }
    }
    fetchCourseOutline();
  }, []);


  async function parseAndFetchLessons(gptResponse) {
  if (typeof gptResponse !== 'string' || gptResponse.trim().length === 0) {
    console.log('No GPT response found');
    return [];
  }

  const lessons = [];
  const lines = gptResponse.split('\n').filter(line => line.trim().length > 0);
  const usedVideoIds = new Set(); // Initialize a set to track used video IDs

  for (let line of lines) {
    if (line.startsWith('Lesson')) {
      const lessonTitle = line.split(':')[1].trim();
      console.log('Fetching videos for:', lessonTitle); // Log lesson title
      try {
        let videoIds = await fetchYouTubeVideoIds(lessonTitle);

        // Filter out video IDs that have already been used
        videoIds = videoIds.filter(id => !usedVideoIds.has(id));

        // If all fetched videos are already used, fetch more or handle the case
        if (videoIds.length === 0) {
          console.log('All videos already used, fetching more or handling case...');
          // You may want to implement a mechanism to fetch more videos here
        } else {
          // Update the global list of used video IDs
          videoIds.forEach(id => usedVideoIds.add(id));

          // Proceed to add the lesson with the unique video IDs
          lessons.push({ id: lessons.length + 1, title: lessonTitle, summary: '', videoIds });
        }
      } catch (error) {
        console.error('Error fetching videos for:', lessonTitle, error);
      }
    }
  }
  return lessons;
}


  async function fetchYouTubeVideoIds(lessonTitle) {
    const apiKey = 'AIzaSyBOIGJ8lJEKwHkn_4YIHg8tcot6_4VbhSI'; // Replace with your API key
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=2&q=${encodeURIComponent(lessonTitle)}&key=${apiKey}`;

    try {
      const response = await axios.get(searchUrl);
      console.log(`Videos fetched for ${lessonTitle}:`, response.data.items); // Log fetched videos
      return response.data.items.map(item => item.id.videoId);
    } catch (error) {
      console.error('Error fetching from YouTube API:', error);
      return [];
    }
  }

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };


  if (!selectedLesson) {
    return (
      <div className="flex flex-col h-screen bg-black text-white items-center justify-center overflow-hidden">
        <Head>
          <title>Loading Course Dashboard...</title>
        </Head>
        <div className="absolute inset-0 flex justify-around items-center w-full h-full opacity-20">
        <FaReact className="text-blue-500 w-32 h-32 animate-spin-slow" />
        <FaBookOpen className="text-yellow-500 w-48 h-48 animate-spin-reverse-slow" />
        <FaBrain className="text-green-500 w-32 h-32 animate-spin-slow" />
      </div>
        <div className="text-center">
          <p className="text-4xl font-avenir mb-2 animate-pulse">Preparing Your Adventure...</p>
          <div className="loader-wrapper mb-4">
            <div className="loader"></div>
            <div className="loader internal"></div>
            <div className="loader sector"></div>
          </div>
          <p className="font-avenir text-lg mb-4">A world of knowledge is just around the corner.</p>
          <p className="font-avenir text-sm animate-blink">Please stand by, magic in progress...</p>
        </div>
        <style jsx>{`
          .loader-wrapper {
            position: relative;
            width: 80px;
            height: 80px;
          }
          .loader, .loader.internal, .loader.sector {
            position: absolute;
            top: 0;
            border: 8px solid transparent;
            border-radius: 50%;
          }
          .loader {
            width: 80px;
            height: 80px;
            border-top-color: #e8d28b;
            animation: spin 1.5s linear infinite;
          }
          .loader.internal {
            width: 60px;
            height: 60px;
            border-top-color: #fff;
            animation: spin-reverse 1s linear infinite;
          }
          .loader.sector {
            width: 40px;
            height: 40px;
            border-top-color: #007BFF;
            animation: spin 0.5s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes spin-reverse {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }
          @keyframes blink {
            50% { opacity: 0.0; }
          }
          .animate-blink {
            animation: blink 1.4s step-end infinite;
          }
          .animate-pulse {
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }

          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes spin-reverse-slow {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          .animate-spin-reverse-slow {
            animation: spin-reverse-slow 15s linear infinite;
          }
          .animate-blink {
            animation: blink 1.4s step-end infinite;
          }
          @keyframes blink {
            50% { opacity: 0.0; }
          }
          .animate-pulse {
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }
  
  


  return (
    <>
      <Head>
        <title>Course Dashboard</title>
      </Head>
      <div className="flex flex-col h-screen bg-black text-white">

        {/* Navigation Bar */}
        <nav className="flex justify-between items-center p-4">
          <Link href="/" passHref>
            <div className="p-4">
              <Image src="/fidulogo.png" alt="Fidu logo" width={80} height={80} className="font-avenir" />
            </div>
          </Link>
          <h1 className="text-4xl font-avenir font-medium text-white">Course Dashboard</h1>
          <div className="space-x-8">
            <Link href="/" passHref>
              <button
                className="text-xl font-medium font-avenir hover:underline"
                style={{ textDecorationColor: '#e8d28b' }} // Replace with your color
              >
                App
              </button>
            </Link>

            <button
              className="text-xl font-medium font-avenir hover:underline"
              style={{ textDecorationColor: '#e8d28b' }}
              onClick={() => window.location.href = 'https://join.slack.com/t/fidutam/shared_invite/zt-2ahd1s1va-tZ2DwtA_IfNAk9O1eT9aPg'}
            >
              Slack
            </button>


            <button
              className="text-xl font-medium font-avenir hover:underline"
              style={{ textDecorationColor: '#e8d28b' }}
              onClick={() => window.location.href = 'mailto:fidutamteam@gmail.com'}
            >
              Feedback
            </button>
          </div>
        </nav>


        {/* Main Content */}
        <div className="flex h-screen">
          <aside className="w-1/4 bg-black text-white">

            <ul>
            {lessons.map((lesson, index) => (
                <li
                  key={lesson.id}
                  onClick={() => handleLessonClick(lesson)}
                  className={`p-4 cursor-pointer font-avenir ${selectedLesson && selectedLesson.id === lesson.id ? 'bg-[#e8d28b] text-[#1f2937]' : 'hover:bg-[#334155] text-white'} rounded-xl`}
                >
                  {/* Include lesson number with title */}
                  Lesson {index + 1}: {lesson.title}
                </li>
              ))}
            </ul>


            <div className="p-4 flex flex-row md-2 items-start">
              <Link href="/create-path" passHref>
                <button className="text-black mt-24 text-xl font-medium font-avenir bg-[#e8d28b] p-2 rounded-lg mb-2 mr-4">
                  + New Path / Regenerate Path ↔︎
                </button>
              </Link>
            </div>
          </aside>

          <section className="w-3/4 bg-[#fdf3db] rounded-3xl overflow-auto">
            <div className="flex justify-between items-start p-4">
              <div className="flex-grow">
                <h2 className="text-2xl font-bold font-avenir rounded-lg text-[#1f2937]">
                  {selectedLesson.title}
                </h2>
                <div className="overflow-auto mt-8 text-black text-xl font-medium font-avenir max-h-screen">
                  {/* YouTube iframes */}
                  {selectedLesson.videoIds.map((videoId, index) => (
                    <iframe
                      key={index}
                      width="600"
                      height="400"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`YouTube video player - ${selectedLesson.title}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="mb-4"
                    ></iframe>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
