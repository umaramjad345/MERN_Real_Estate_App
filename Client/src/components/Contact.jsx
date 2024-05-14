import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/v1/user/${listing.userRef}`,
          { method: "GET", credentials: "include" }
        );
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="border-none rounded-bl-none rounded-br-none p-3 rounded-lg focus:outline-none bg-gray-200 dark:bg-opacity-20 text-gray-600 dark:text-gray-100"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="text-center p-3 rounded-lg bg-blue-600 border-2 border-blue-600 hover:bg-transparent text-gray-100 hover:text-blue-600 dark:border-opacity-20 dark:bg-opacity-20 transition-all duration-300"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
