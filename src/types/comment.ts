export type Comment={
  id: string,
  name: string,
  day: string,
  comment: string,
  replies: Reply[],
};

export type Reply={
  id: string,
  name: string,
  day: string,
  reply: string,
};

export type newReply={
  name: string,
  day: string,
  reply: string,
};