import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation sendMessage($value: String!, $toId: String!) {
    sendMessage(data: { value: $value, toId: $toId }) {
      id
      roomId
      value
      type
      senderId
    }
  }
`;

export const RECIEVE_MESSAGE = gql`
  subscription messageSent {
    messageSent {
      id
      senderId
      roomId
      type
      value
      sentUser {
        id
        name
        image_src
      }
    }
  }
`;
