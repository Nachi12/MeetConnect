import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash, FaComments } from "react-icons/fa";
import axios from "axios";

const InterviewRoom = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
   const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [interview, setInterview] = useState(null);
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  useEffect(() => {
    fetchInterviewDetails();
  }, [interviewId]);

  const fetchInterviewDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/interviews/${interviewId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setInterview(res.data.interview);
    } catch (error) {
      console.error("Failed to fetch interview details:", error);
    }
  };

const endInterview = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.patch(`${import.meta.env.VITE_API_URL}/api/interviews/${interviewId}/complete`, 
      { status: 'completed' },
      { headers: { "Authorization": `Bearer ${token}` } }
    );
    
    alert("Interview completed successfully!");
    navigate("/dashboard"); // Changed from "/my-interviews" to "/dashboard"
  } catch (error) {
    console.error("Failed to end interview:", error);
    alert("Failed to end interview. Please try again.");
  }
};


  if (!interview) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // return (
  //   <div className="h-screen bg-gray-900 text-white flex flex-col">
  //     {/* Header */}
  //     <div className="bg-gray-800 p-4 flex justify-between items-center">
  //       <div>
  //         <h1 className="text-xl font-bold">{interview.type} Interview</h1>
  //         <p className="text-gray-300 text-sm">with {interview.interviewer}</p>
  //       </div>
  //       <div className="flex items-center gap-2 text-sm text-gray-300">
  //         <span>🔴 Recording</span>
  //       </div>
  //     </div>

  //     {/* Main Video Area */}
  //     <div className="flex-1 flex">
  //       {/* Main Video */}
  //       <div className="flex-1 bg-gray-800 relative flex items-center justify-center">
  //         <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
  //           <div className="text-center">
  //             <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
  //               <FaVideo className="text-4xl" />
  //             </div>
  //             <p className="text-xl font-semibold">{interview.interviewer}</p>
  //             <p className="text-gray-300">Interviewer</p>
  //           </div>
  //         </div>
          
  //         {/* Your video (small overlay) */}
  //         <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-700 rounded-lg flex items-center justify-center">
  //           <div className="text-center">
  //             <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-2 mx-auto">
  //               <FaVideo className="text-xl" />
  //             </div>
  //             <p className="text-sm">You</p>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Chat Panel (optional) */}
  //       <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
  //         <h3 className="font-semibold mb-4 flex items-center gap-2">
  //           <FaComments /> Chat
  //         </h3>
  //         <div className="flex-1 text-sm text-gray-400">
  //           <p>Interview started. Good luck! 🍀</p>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Controls */}
  //     <div className="bg-gray-800 p-4 flex justify-center items-center gap-4">
  //       {/* Mute Button */}
  //       <button
  //         onClick={() => setIsMuted(!isMuted)}
  //         className={`p-3 rounded-full ${isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'} transition-colors`}
  //       >
  //         {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
  //       </button>

  //       {/* Video Button */}
  //       <button
  //         onClick={() => setIsVideoOff(!isVideoOff)}
  //         className={`p-3 rounded-full ${isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'} transition-colors`}
  //       >
  //         {isVideoOff ? <FaVideoSlash /> : <FaVideo />}
  //       </button>

  //       {/* End Interview Button */}
  //       <button
  //         onClick={() => setShowEndConfirm(true)}
  //         className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors"
  //       >
  //         <FaPhoneSlash />
  //         End Interview
  //       </button>
  //     </div>

  //     {/* End Confirmation Modal */}
  //     {showEndConfirm && (
  //       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  //         <div className="bg-white text-black p-6 rounded-lg max-w-md w-full mx-4">
  //           <h2 className="text-xl font-bold mb-4">End Interview?</h2>
  //           <p className="text-gray-600 mb-6">
  //             Are you sure you want to end this interview? This action cannot be undone.
  //           </p>
  //           <div className="flex gap-3 justify-end">
  //             <button
  //               onClick={() => setShowEndConfirm(false)}
  //               className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
  //             >
  //               Cancel
  //             </button>
  //             <button
  //               onClick={endInterview}
  //               className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
  //             >
  //               End Interview
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
  return (
  <div className="min-h-screen bg-gray-900 text-white flex flex-col">
    {/* Header */}
    <div className="bg-gray-800 p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
      <div>
        <h1 className="text-lg sm:text-xl font-bold">{interview.type} Interview</h1>
        <p className="text-gray-300 text-sm sm:text-base">with {interview.interviewer}</p>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-300 justify-end">
        <span>🔴 Recording</span>
      </div>
    </div>

    {/* Main Area */}
    <div className="flex-1 flex flex-col lg:flex-row">
      {/* Main Video */}
      <div className="flex-1 bg-gray-800 relative flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaVideo className="text-3xl sm:text-4xl" />
            </div>
            <p className="text-lg sm:text-xl font-semibold">{interview.interviewer}</p>
            <p className="text-gray-300 text-sm sm:text-base">Interviewer</p>
          </div>
        </div>

        {/* Your Video Overlay */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-32 h-24 sm:w-48 sm:h-36 bg-gray-700 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mb-2 mx-auto">
              <FaVideo className="text-lg sm:text-xl" />
            </div>
            <p className="text-xs sm:text-sm">You</p>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      <div className="w-full lg:w-80 bg-gray-800 border-t lg:border-t-0 lg:border-l border-gray-700 p-4 flex flex-col">
        <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm sm:text-base">
          <FaComments /> Chat
        </h3>
        <div className="flex-1 text-xs sm:text-sm text-gray-400 overflow-y-auto">
          <p>Interview started. Good luck! 🍀</p>
        </div>
      </div>
    </div>

    {/* Controls */}
    <div className="bg-gray-800 p-3 sm:p-4 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
      {/* Mute Button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className={`p-2 sm:p-3 rounded-full ${
          isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
        } transition-colors`}
      >
        {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
      </button>

      {/* Video Button */}
      <button
        onClick={() => setIsVideoOff(!isVideoOff)}
        className={`p-2 sm:p-3 rounded-full ${
          isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
        } transition-colors`}
      >
        {isVideoOff ? <FaVideoSlash /> : <FaVideo />}
      </button>

      {/* End Interview Button */}
      <button
        onClick={() => setShowEndConfirm(true)}
        className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center gap-2 text-sm sm:text-base transition-colors"
      >
        <FaPhoneSlash />
        End Interview
      </button>
    </div>

    {/* End Confirmation Modal */}
    {showEndConfirm && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white text-black p-4 sm:p-6 rounded-lg w-full max-w-md">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">End Interview?</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
            Are you sure you want to end this interview? This action cannot be undone.
          </p>
          <div className="flex gap-2 sm:gap-3 justify-end">
            <button
              onClick={() => setShowEndConfirm(false)}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-600 hover:bg-gray-100 rounded text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              onClick={endInterview}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm sm:text-base"
            >
              End Interview
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

};

export default InterviewRoom;
