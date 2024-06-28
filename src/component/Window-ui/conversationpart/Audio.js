import React, { useEffect, useRef } from 'react';

function Audio({ calling, animationIdRef, analyser, setDataArray }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (calling && analyser) {
      const canvas = canvasRef?.current;
      const canvasCtx = canvas.getContext('2d');
      const bufferLength = analyser.frequencyBinCount;
      const newArray = new Uint8Array(bufferLength);
      setDataArray(newArray);

      const draw = () => {
        if (!analyser) return;

        animationIdRef.current = requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(newArray);

        canvasCtx.fillStyle = '#009688';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

        canvasCtx.beginPath();

        const sliceWidth = (canvas.width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = newArray[i] / 128.0;
          const y = (v * canvas.height) / 2;

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
      };

      draw();
    }

    return () => {
      if (animationIdRef?.current) {
        cancelAnimationFrame(animationIdRef?.current);
      }
    };
  }, [calling, analyser, setDataArray]);

  return (
    <canvas ref={canvasRef} width="150" height="30"></canvas>
  );
}

export default Audio;
