import { RiUserSearchLine } from "react-icons/ri";
import { useState, useRef, useEffect, useCallback } from "react";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversation";

const Searchinput = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const containerRef = useRef(null);

  // ---------------------------
  // 1️⃣ Debounce search input
  // ---------------------------
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 250); // 250ms debounce

    return () => clearTimeout(timer);
  }, [search]);

  // ------------------------------------
  // 2️⃣ Filter suggestions (debounced)
  // ------------------------------------
 const filteredSuggestions =
  debouncedSearch.length > 0
    ? conversations
        .filter((c) => c?.fullName) // keep only valid ones
        .filter((c) =>
          c.fullName.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
    : [];


  // ------------------------------------
  // 3️⃣ Click outside to close suggestions
  // ------------------------------------
  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ------------------------------------
  // 4️⃣ Handle search submit
  // ------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!search.trim()) return setError("Search cannot be empty");
    if (search.length < 3)
      return setError("Search must be at least 3 characters");

    const match = filteredSuggestions[0];
    if (!match) return setError("No user found");

    selectConversation(match);
  };

  const selectConversation = (conv) => {
    setSelectedConversation(conv);
    setSearch("");
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  // ------------------------------------
  // 5️⃣ Keyboard navigation
  // ------------------------------------
  const handleKeyDown = (e) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        selectConversation(filteredSuggestions[selectedIndex]);
      } else {
        handleSubmit(e);
      }
    }
  };

  // ------------------------------------
  // 6️⃣ Highlight matched text
  // ------------------------------------
  const highlightMatch = (text) => {
    const searchLower = debouncedSearch.toLowerCase();
    const start = text.toLowerCase().indexOf(searchLower);

    if (start === -1) return text;

    const end = start + searchLower.length;

    return (
      <>
        {text.slice(0, start)}
        <span className="font-bold text-blue-600">
          {text.slice(start, end)}
        </span>
        {text.slice(end)}
      </>
    );
  };

  return (
    <div className="w-full relative" ref={containerRef}>
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full h-10 justify-center"
      >
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          className="px-4 py-2 mr-1 w-[95%] h-9 rounded-full border border-gray-300 focus:outline-none"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2"
        >
          <RiUserSearchLine className="w-4 h-5" />
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (search.length > 0 || debouncedSearch.length > 0) && (
        <ul className="absolute top-11 left-0 w-full bg-white shadow-md rounded-md max-h-48 overflow-y-auto border border-gray-200 z-20">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((conv, idx) => (
              <li
                key={conv._id}
                className={`px-4 py-2 cursor-pointer 
                  ${idx === selectedIndex ? "bg-blue-100" : "hover:bg-gray-100"}`}
                onClick={() => selectConversation(conv)}
              >
                {highlightMatch(conv.fullName)}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
      )}
    </div>
  );
};

export default Searchinput;
