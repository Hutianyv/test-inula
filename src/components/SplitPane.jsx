import { useState, useRef, useCallback, useEffect, Children } from 'openinula';

export const SplitPane = ({
  children,
  defaultSizes = [50, 50],
  minSize = 20,
  direction = 'horizontal',
  // className = '',
}) => {
  const [sizes, setSizes] = useState(defaultSizes);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startPosRef = useRef(0);
  const startSizesRef = useRef([]);
  const activeDividerRef = useRef(-1);

  const handleMouseDown = useCallback(
    (e, dividerIndex) => {
      e.preventDefault();
      isDraggingRef.current = true;
      activeDividerRef.current = dividerIndex;
      startPosRef.current = direction === 'horizontal' ? e.clientX : e.clientY;
      startSizesRef.current = [...sizes];
      document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';
    },
    [direction, sizes]
  );

  const handleMouseMove = useCallback(
    e => {
      if (!isDraggingRef.current || !containerRef.current || activeDividerRef.current === -1)
        return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerSize = direction === 'horizontal' ? containerRect.width : containerRect.height;
      const delta =
        direction === 'horizontal'
          ? e.clientX - startPosRef.current
          : e.clientY - startPosRef.current;

      const percentage = (delta / containerSize) * 100;
      const newSizes = [...startSizesRef.current];

      const leftIndex = activeDividerRef.current;
      const rightIndex = leftIndex + 1;

      const totalSize = newSizes[leftIndex] + newSizes[rightIndex];
      const leftSize = Math.max(
        minSize,
        Math.min(totalSize - minSize, newSizes[leftIndex] + percentage)
      );
      const rightSize = totalSize - leftSize;

      newSizes[leftIndex] = leftSize;
      newSizes[rightIndex] = rightSize;

      setSizes(newSizes);
    },
    [direction, minSize]
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    activeDividerRef.current = -1;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const childrenArray = Children.toArray(children);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      {Children.map(childrenArray, (child, index) => {
        const isLast = index === childrenArray.length - 1;
        return (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: direction === 'horizontal' ? 'row' : 'column',
              width: direction === 'horizontal' ? `${sizes[index]}%` : '100%',
              height: direction === 'horizontal' ? '100%' : `${sizes[index]}%`,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                flex: 1,
                overflow: 'auto',
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              {child}
            </div>
            {!isLast && (
              <div
                style={{
                  width: direction === 'horizontal' ? '4px' : '100%',
                  height: direction === 'horizontal' ? '100%' : '4px',
                  backgroundColor: '#e5e7',
                  cursor: direction === 'horizontal' ? 'col-resize' : 'row-resize',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                }}
                onMouseDown={e => handleMouseDown(e, index)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
