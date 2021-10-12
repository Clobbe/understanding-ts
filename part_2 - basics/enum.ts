enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person = {
  name: "Clobbe",
  age: 30,
  hobbies: ["sports", "cooking", "music"],
  role: Role.ADMIN,
};

let favoriteActivity: string[];
favoriteActivity = ["soccer"];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

if (person.role == Role.ADMIN) {
  console.log("person is ADMIN");
}
