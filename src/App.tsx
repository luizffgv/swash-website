import { useState } from "react";
import Number from "./components/Number";
import { NumberGhost } from "./components/NumberGhost";
import { Clear } from "./components/Clear";
import ClearGhost from "./components/ClearGhost";
import Multiplier from "./components/Multiplier";
import { Draggable, DragReceiver, ShrinkingGhost } from "swash";
import AnimateOnDrag from "./components/AnimateOnDrag";
import { AddPayload, MultiplyPayload, SetPayload } from "./lib/payloads";
import TransitionOnRelease from "./components/draggable-modifiers/TransitionOnRelease";
import Link from "./components/Link";

function App() {
  const [hovering, setHovering] = useState(false);

  const [accumulator, setAccumulator] = useState(0);

  return (
    <div className="flex min-h-screen select-none flex-col items-center justify-center gap-8 bg-slate-50 p-8">
      <p className="max-w-prose">
        Here you can try{" "}
        <Link href="https://github.com/luizffgv/swash">Swash</Link>, a React
        framework for drag and drop interactions.
      </p>
      <DragReceiver
        onSwashDragEnter={() => setHovering(true)}
        onSwashDragLeave={() => setHovering(false)}
        onSwashDrop={(event) => {
          setHovering(false);

          if (event.payload instanceof AddPayload) {
            const value = event.payload.value;
            setAccumulator((a) => a + value);
          } else if (event.payload instanceof SetPayload) {
            setAccumulator(event.payload.value);
          }
        }}
      >
        <div
          className={`flex flex-col gap-2 rounded-md bg-slate-100 p-4 outline outline-4 transition-all ${hovering ? "outline-primary" : "outline-transparent"}`}
        >
          <div className="flex flex-row items-center text-xl">
            Total
            <Draggable
              ghost={<ShrinkingGhost duration={250} />}
              onReply={(payload) => {
                if (payload instanceof MultiplyPayload)
                  setAccumulator((a) => a * payload.value);
              }}
            >
              <AnimateOnDrag>
                <span className="ml-4 rounded-md bg-primary px-2 py-1 text-center font-bold text-white">
                  {accumulator}
                </span>
              </AnimateOnDrag>
            </Draggable>
          </div>
        </div>
      </DragReceiver>
      <div className="flex max-w-[150px] flex-row flex-wrap justify-between gap-2 text-lg">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
          <Draggable key={value} ghost={<NumberGhost value={value} />}>
            <TransitionOnRelease>
              <AnimateOnDrag>
                <Number value={value} />
              </AnimateOnDrag>
            </TransitionOnRelease>
          </Draggable>
        ))}
        <Draggable ghost={<ClearGhost />}>
          <TransitionOnRelease>
            <AnimateOnDrag>
              <Clear />
            </AnimateOnDrag>
          </TransitionOnRelease>
        </Draggable>
        <Multiplier multiplier={5} />
      </div>
      <ul className="list-inside list-disc">
        <li>Drag numbers into the total to increase it by that amount;</li>
        <li>Drag the eraser into the total to reset it;</li>
        <li>
          Drag the total into <strong className="text-primary">X5</strong> to
          multiply it by 5.
        </li>
      </ul>
    </div>
  );
}

export default App;
