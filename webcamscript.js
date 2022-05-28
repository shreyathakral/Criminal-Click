Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('./models')
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
  
  const people = []
  
  async function recognizeFaces() {
    console.log("recogfaces started")
    const video = document.getElementById('video')
    const labeledFaceDescriptors = await loadLabeledImages()
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.5)
  
  video.addEventListener('playing', async () => {
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
        drawBox.draw(canvas)
  
        const str = result.toString()
          const myarray = str.split(" ")
          
              var a = document.createElement('a');
              var linkText = document.createTextNode(str);
              a.appendChild(linkText);
              a.title = str;
              if(myarray[0]!="unknown")
              {
              a.href = `${myarray[0]}.html`;
              document.body.appendChild(a);
              }
          
         
      })
    }, 100)
  })
  }
  //document.getElementById('start').addEventListener('click',startVideo)
  function loadLabeledImages() {
      const labels =['Andre_Harris', 'Beck_Oliver', 'Cat_Valentine', 'Jade_West', 'Robbie_Shapiro', 'Tori_Vega','Shreya']
    
    return Promise.all(
      labels.map(async (label) => {
        const descriptions = []
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`../Images/${label}.jpg`)
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
          descriptions.push(detections.descriptor)
        }
  
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
      })
    )
  }
  
  function stopwebcam(){
    const video = document.getElementById('video')
    navigator.getUserMedia(
      { video: {} },
      stream => video.srcObject = null,
      err => console.error(err)
    )
  }
  
  
  document.getElementById('stop').addEventListener('click',stopwebcam)