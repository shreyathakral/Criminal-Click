Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
  ]).then(startVideo)
  
  async function startVideo() {
    const video = document.getElementById('video')
    navigator.getUserMedia(
      { video: {} },
      stream => video.srcObject = stream,
      err => console.error(err)
    )
    recognizeFaces()
  }
  
  
  async function recognizeFaces() {
    const video = document.getElementById('video')
    const labeledFaceDescriptors = await loadLabeledImages()
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.5)
  
  video.addEventListener('play', async () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      faceapi.draw.drawDetections(canvas, resizedDetections)
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      const results = resizedDetections.map((d) => {return  faceMatcher.findBestMatch(d.descriptor)})
      results.forEach((result, i) => {
        const box = resizedDetections[i].detection.box
        const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
        const str = result.toString()
  
        // elem.innerHTML=str
        // document.body.appendChild(elem)
        var a = document.createElement('a');
        var linkText = document.createTextNode(str);
        a.appendChild(linkText);
        a.title = str;
        console.log(str)
        const myarray = str.split(" ")
      //   if(myarray[0] != "unknown")
      //   alert("criminal here !!!!")
      //   else
      //   alert("no criminal")
        
        console.log(myarray[0])
        a.href = `${myarray[0]}.html`;
        document.body.appendChild(a);
  
        drawBox.draw(canvas)
      })
    }, 100)
  })
  }
  
  
  function loadLabeledImages() {
    const labels = ['deepika']
    
    return Promise.all(
      labels.map(async (label) => {
        const descriptions = []
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`${label}.jpg`)
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
          descriptions.push(detections.descriptor)
        }
  
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
      })
    )
  }