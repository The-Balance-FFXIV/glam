// Open the Modal
function openModal(element) {
    document.getElementById("modalPic").src = element.src;
    document.getElementById("myModal").showModal();
}
  
// Close the Modal
function closeModal() { 
    // Prevents briefly displaying previous modal image while new image is loading.
    document.getElementById("modalPic").src = "";
    document.getElementById("myModal").close();
}
