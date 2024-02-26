import React, { forwardRef, useImperativeHandle } from 'react';

const ChildComponent = forwardRef((props, ref) => {
 

  useImperativeHandle(ref, () => ({
    handleChildClick:() => {
        console.log('Button clicked in Child');
      }
  }));

  return (
    <div>
      <h2>Child Component</h2>
    </div>
  );
});

export default ChildComponent;
