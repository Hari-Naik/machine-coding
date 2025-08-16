export interface CommentType {
  id: number;
  text: string;
  replies: CommentType[];
}

export const commentsData: CommentType[] = [
  {
    id: 1,
    text: "This is the first comment",
    replies: [
      {
        id: 2,
        text: "This is a reply to the first comment",
        replies: [
          {
            id: 3,
            text: "Nested reply to comment 2",
            replies: [],
          },
          {
            id: 4,
            text: "Another nested reply to comment 2",
            replies: [
              {
                id: 5,
                text: "Deeply nested reply under comment 4",
                replies: [],
              },
            ],
          },
        ],
      },
      {
        id: 6,
        text: "Another reply to the first comment",
        replies: [],
      },
    ],
  },
  {
    id: 7,
    text: "This is a second top-level comment",
    replies: [
      {
        id: 8,
        text: "Reply to second comment",
        replies: [],
      },
    ],
  },
];
