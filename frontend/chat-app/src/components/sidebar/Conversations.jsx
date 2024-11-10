import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversation";

const Conversations = ({onSelect}) => {
  const { loading, conversations } = useGetConversations();
  console.log(conversations); // Log conversations to check the data

  return (
    <div className="flex flex-col overflow-auto">
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : (
        <>
          {conversations.length === 0 ? (
            <p>No conversations found.</p>
          ) : (
            conversations.map((conversation, idx) => (
              <Conversation
                key={conversation._id}
                conversation={conversation}
                lastIdx={idx === conversations.length - 1}
                onSelect={onSelect}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Conversations;
