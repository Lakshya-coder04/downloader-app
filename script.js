const fileInput = document.querySelector('input');
const button = document.querySelector('button');

button.addEventListener('click', (event) => {
  event.preventDefault();

  button.innerText = 'Downloading File....';
  fetchFile(fileInput.value);
});

function fetchFile(url) {
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      //   console.log(file);
      let tempUrl = URL.createObjectURL(file); //create a temp url
      const link = document.createElement('a'); //create a hidden anchor element
      link.href = tempUrl;
      //set the url to the temporary url and set the donwload attribute
      link.setAttribute('download', 'download');
      //hide the anchor element
      link.style.display = 'none';
      //add the anchor to document
      document.body.appendChild(link);
      // trigger the click function
      link.click();
      URL.revokeObjectURL(tempUrl);
      button.innerText = 'Download';
    })
    .catch(() => {
      button.innerText = 'Download';
      alert('Failed to download the requested file!');
    });
}
