const id = window.location.toString().split("/")[
  window.location.toString().split("/").length - 1
];

// Click on edit post
const editHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="post-content"]').value;

  const response = await fetch(`/api/post/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      postId: id,
      title,
      content,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert("Something wrong!");
  }
};

const delButtonHandler = async (event) => {
  //   if (event.target.hasAttribute("data-id")) {
  //     const id = event.target.getAttribute("data-id");

  const response = await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete post");
  }
};
// };

document.querySelector("#delete").addEventListener("click", delButtonHandler);

document.querySelector("#update").addEventListener("click", editHandler);