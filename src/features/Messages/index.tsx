import { v4 as uuid } from "uuid";
import { useQuery, useMutation, useSubscription } from "@apollo/client";

import { MARK_READ_MUTATION, SEND_MESSAGE_MUTATION } from "../../lib/mutations";
import { GET_PEOPLE_QUERY, GET_MESSAGES_QUERY } from "../../lib/queries";
import { MESSAGE_RECEIVED_SUBSCRIPTION } from "../../lib/subscriptions";
import { MessageType, PersonType } from "../../lib/types";

import MessagesButton from "./components/MessagesButton";
import MessagesEmpty from "./components/MessagesEmpty";
import MessagesInput from "./components/MessagesInput";
import MessagesListSkeleton from "./components/MessagesListSkeleton";
import MessagesNoPerson from "./components/MessagesNoPerson";
import Message from "./components/Message";
import { useState } from "react";

interface MessagesProps {
  selectedPerson?: PersonType;
}

const Messages = ({ selectedPerson }: MessagesProps) => {
  const { data } = useQuery(GET_MESSAGES_QUERY, {
    skip: !selectedPerson,
    variables: { personId: selectedPerson?.id },
  });
  console.log(data);
  const messages = data?.messages;

  console.log(data);
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 overflow-y-auto">
        {selectedPerson ? (
          <MessagesList messages={messages} selectedPerson={selectedPerson} />
        ) : (
          <MessagesNoPerson />
        )}

        {/* TODO: If a person is selected, show <MessagesList /> ... */}
      </div>
      <div className="h-20 p-4">
        {selectedPerson ? <MessagesForm/> : ''}
      </div>
    </div>
  );
};

interface MessagesListProps {
  messages: MessageType[];
  selectedPerson: PersonType;
}

/** A component render a list of conversations with a single person. */
const MessagesList = ({ messages, selectedPerson }: MessagesListProps) => {
  // TODO: If the list is empty, show <MessagesEmpty /> ...

  return (
    <div className="p-4 pb-0 flex flex-col mt-auto w-full gap-4">
      {messages?.length ? (
        messages.map((message) => (
          <Message
            key={message.id}
            self={message.sender.self} 
            body={message.body}
            timestamp={message.timestamp}
          />
        ))
      ) : (
        <MessagesEmpty person={selectedPerson} />
      )}
      <div />
    </div>
  );
};

interface MessagesFormProps {
  recipientId: string
}

/** Provides a form for sending a message to the currently selected person */
const MessagesForm = ({recipientId}: MessagesFormProps) => {
  return (
    <form className="flex gap-2">
      {/* TODO: Use <MessagesInput /> component for the message body ... */}

      {/* TODO: Use <MessagesButton /> component for the send button ... */}
    </form>
  );
};

export default Messages;
