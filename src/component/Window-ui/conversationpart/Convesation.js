import React from 'react'

 function Convesation() {
    return (
        <div style={{ overflowY: "auto", height: "calc(100vh - 180px)", padding: "10px" }}>
          {/* Placeholder for conversation area */}
          <div style={{ marginBottom: "10px" }}>
            <p>Sample message</p>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <p>Another sample message</p>
          </div>
          {/* End of placeholder */}
        </div>
      );
    };

export default  Convesation;