const lists=[
    {
      "id": "listId1",
      "name": "To Do",
      "boardId": "boardId1"
    },
    {
      "id": "listId2",
      "name": "In Progress",
      "boardId": "boardId1"
    },
    {
      "id": "listId3",
      "name": "Done",
      "boardId": "boardId1"
    }
  ];

const tasks = [
    {
      "id": "taskId1",
      "title": "Complete documentation",
      "listId": "listId1",
      "createdBy": "userId1",
      "status": "to-do",
      "dueDate": "2023-11-05T10:00:00Z",
      "comments": [
        {
          "id": "commentId1",
          "userId": "userId2",
          "content": "Please add more details.",
          "timestamp": "2023-11-01T12:00:00Z"
        },
        {
          "id": "commentId2",
          "userId": "userId3",
          "content": "I agree, more details would help.",
          "timestamp": "2023-11-01T13:00:00Z"
        }
      ]
    },
    {
      "id": "taskId2",
      "title": "Create project roadmap",
      "listId": "listId1",
      "createdBy": "userId1",
      "status": "to-do",
      "dueDate": "2023-11-10T15:00:00Z",
      "comments": [
        {
          "id": "commentId3",
          "userId": "userId2",
          "content": "Let's discuss this in the next meeting.",
          "timestamp": "2023-11-02T09:00:00Z"
        }
      ]
    },
    {
      "id": "taskId3",
      "title": "Code review",
      "listId": "listId2",
      "createdBy": "userId2",
      "status": "in-progress",
      "dueDate": "2023-11-06T16:00:00Z",
      "comments": [
        {
          "id": "commentId4",
          "userId": "userId1",
          "content": "Please check line 45 for optimization.",
          "timestamp": "2023-11-03T14:30:00Z"
        }
      ]
    },
    {
      "id": "taskId4",
      "title": "Finalize UI design",
      "listId": "listId2",
      "createdBy": "userId3",
      "status": "in-progress",
      "dueDate": "2023-11-08T09:00:00Z",
      "comments": [
        {
          "id": "commentId5",
          "userId": "userId2",
          "content": "Looks great, but maybe try a different color scheme.",
          "timestamp": "2023-11-04T11:20:00Z"
        }
      ]
    },
    {
      "id": "taskId5",
      "title": "Deploy to production",
      "listId": "listId3",
      "createdBy": "userId1",
      "status": "done",
      "dueDate": "2023-10-30T10:00:00Z",
      "comments": [
        {
          "id": "commentId6",
          "userId": "userId3",
          "content": "Deployed successfully.",
          "timestamp": "2023-10-30T12:00:00Z"
        }
      ]
    }
  ]
  

export default function Main() {
    return <main className="flex-1 overflow-auto">
        <div className="bg-gray-100 flex flex-col">
        </div>
    </main>;
  }
  