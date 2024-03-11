// Profile.jsx
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const { state } = useAuth();
  const user = state.user;

  return (
    <div className="mx-auto dark:bg-gray-500">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-700 rounded-md shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-6">My Profile</h2>
        <div className="flex items-center mb-6">
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-20 h-20 rounded-full object-cover mr-4 shadow-lg"
          />
          <div>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">{user.fullName}</p>
            <p className="text-gray-600 dark:text-gray-300 text-md">Role: {user.role}</p>
          </div>
        </div>
        <hr className="my-4 border-t border-gray-300 dark:border-gray-700" />
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Professional Profile</p>
          <p className="text-gray-600 dark:text-gray-300">
            {`A highly dedicated and motivated software engineering student pursuing B.E. in Software Engineering. Passionate about becoming a full-stack software developer. Adaptable, committed to delivering high-quality results within deadlines. Experienced in MERN stack and IoT development. Skilled in Agile frameworks, teamwork, and communication.`}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Project</p>
          <p className="text-gray-600 dark:text-gray-300">
            {`Online Education Platform [Start - End Date]: Full-Stack Web Developer Developed a full-stack web app for online coding courses and articles publishing. Used EJS, CSS, Bootstrap, JavaScript, Node.js, Express, MongoDB. Implemented authentication, payment systems, and security measures. Collaborated in a team, showcasing adaptability and teamwork.`}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {`IoT Project - Automated Car Parking [Start - End Date]: Project Leader Led an IoT project for automated car parking. Integrated sensors, ESP8266 microcontroller for real-time slot monitoring. Implemented MQTT for efficient sensor data communication. Effectively communicated project requirements and progress, ensuring smooth collaboration.`}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Education</p>
          <p className="text-gray-600 dark:text-gray-300">{`Chitkara University, Punjab Expected 2025: Bachelor of Engineering in Software Engineering`}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Technical Skills</p>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
            <li>Programming Languages: C, C++, C#, Java, JavaScript</li>
            <li>Web Development: Node.js, Express, React</li>
            <li>IoT: Arduino, ESP8266, Raspberry Pi, MQTT</li>
            <li>Database: MongoDB</li>
            <li>Version Control: Git</li>
            <li>Web Technologies: HTML, CSS, Bootstrap</li>
          </ul>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Certifications</p>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
            <li>FreeCodeCamp Certified JavaScript Developer</li>
            <li>Udemy Certified MERN Stack Developer</li>
          </ul>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Languages</p>
          <p className="text-gray-600 dark:text-gray-300">{`English - Business Competence Hindi - Native`}</p>
        </div>
        <hr className="my-4 border-t border-gray-300 dark:border-gray-700" />
        {/* Link to GitHub profile */}
        <a
          href="https://github.com/sanjiv1458"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-300">
          Visit GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default Profile;
