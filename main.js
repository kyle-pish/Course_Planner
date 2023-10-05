// Initialize an empty course dictionary.
const courseDictionary = {};

// Function to add a class to the dictionary
function addClass() {
  // Get the class name from the "addClassInput" input field and remove leading/trailing whitespace.
  const className = document.getElementById("addClassInput").value.trim();

  // Check if the class name is not empty.
  if (className !== '') {
    // Check if the class does not already exist in the dictionary.
    if (!courseDictionary.hasOwnProperty(className)) {
      // Initialize an empty array for prerequisites of this class.
      courseDictionary[className] = [];

      // Update the class list displayed in the HTML.
      updateClassList();
    } else {
      // Alert the user that the class already exists.
      alert(`${className} already exists in the dictionary.`);
    }

    // Clear the input field.
    document.getElementById("addClassInput").value = '';
  }
}

// Function to add a prerequisite relationship between two classes
function addPrerequisite() {
  // Get the names of two classes from input fields and remove leading/trailing whitespace.
  const class1 = document.getElementById("addPrerequisiteInput").value.trim();
  const class2 = document.getElementById("addPrerequisiteForInput").value.trim();

  // Check if both class names are not empty.
  if (class1 !== '' && class2 !== '') {
    // Check if class1 exists in the dictionary.
    if (!courseDictionary.hasOwnProperty(class1)) {
      // Alert the user that class1 does not exist.
      alert(`${class1} does not exist. Add it to the list first.`);
      return;
    }

    // Check if class2 is not already a prerequisite for class1.
    if (!courseDictionary[class1].includes(class2)) {
      // Add class2 to the prerequisites of class1.
      courseDictionary[class1].push(class2);

      // Update the class list displayed in the HTML to show prerequisites.
      updateClassList();
    } else {
      // Alert the user that class2 is already a prerequisite for class1.
      alert(`${class2} is already a prerequisite for ${class1}.`);
    }

    // Clear the input fields.
    document.getElementById("addPrerequisiteInput").value = '';
    document.getElementById("addPrerequisiteForInput").value = '';
  }
}

// Function to delete a class and its prerequisites
function deleteClass() {
  // Get the class name to delete from the "deleteClassInput" input field and remove leading/trailing whitespace.
  const className = document.getElementById("deleteClassInput").value.trim();

  // Check if the class exists in the dictionary.
  if (courseDictionary.hasOwnProperty(className)) {
    // Delete the class from the dictionary.
    delete courseDictionary[className];

    // Update the class list displayed in the HTML.
    updateClassList();
  } else {
    // Alert the user that the class does not exist.
    alert(`${className} does not exist in the dictionary.`);
  }

  // Clear the input field.
  document.getElementById("deleteClassInput").value = '';
}

// Function to delete a prerequisite relationship between two classes
function deletePrerequisite() {
  // Get the names of two classes from input fields and remove leading/trailing whitespace.
  const class1 = document.getElementById("deletePrerequisiteInput").value.trim();
  const class2 = document.getElementById("deletePrerequisiteForInput").value.trim();

  // Check if both class names are not empty.
  if (class1 !== '' && class2 !== '') {
    // Check if class1 exists in the dictionary.
    if (courseDictionary.hasOwnProperty(class1)) {
      // Get the prerequisites of class1.
      const prerequisites = courseDictionary[class1];

      // Find the index of class2 in the prerequisites array.
      const index = prerequisites.indexOf(class2);

      // If class2 is found as a prerequisite for class1, remove it.
      if (index !== -1) {
        prerequisites.splice(index, 1);

        // Update the class list displayed in the HTML to show prerequisites.
        updateClassList();
      } else {
        // Alert the user that class2 is not a prerequisite for class1.
        alert(`${class2} is not a prerequisite for ${class1}.`);
      }
    } else {
      // Alert the user that class1 does not exist.
      alert(`${class1} does not exist in the dictionary.`);
    }

    // Clear the input fields.
    document.getElementById("deletePrerequisiteInput").value = '';
    document.getElementById("deletePrerequisiteForInput").value = '';
  }
}

// Function to update the class list in the HTML
function updateClassList() {
  // Get the HTML element that will display the class list.
  const classListElement = document.getElementById("classList");

  // Clear the existing content of the class list.
  classListElement.innerHTML = '';

  // Iterate through the course dictionary and display class names and their prerequisites.
  for (const className in courseDictionary) {
    if (courseDictionary.hasOwnProperty(className)) {
      const prerequisites = courseDictionary[className];
      const listItem = document.createElement("li");
      listItem.textContent = `${className} Prerequisites: ${prerequisites.join(", ")}`;
      classListElement.appendChild(listItem);
    }
  }
}