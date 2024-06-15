import { useEffect, useRef, useState } from "react";
import { BallManager } from "../game/classes/BallManager";
import axios from "axios";
import { Button } from "../components/ui";
import { baseURL } from "../utils";
import { Balance } from "../components/balance";

export function Game() {
  const [ballManager, setBallManager] = useState<BallManager>();
  const canvasRef = useRef<any>();
  const [balance, setBalance] = useState<number>(1000);

  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(
        canvasRef.current as unknown as HTMLCanvasElement
      );
      setBallManager(ballManager);
    }
  }, [canvasRef]);

  return (<div>
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <canvas ref={canvasRef} width="800" height="800"></canvas>
      <div className="flex flex-col">
      <Balance balance={balance}></Balance>
      <Button
        className="px-10 mb-4"
        onClick={async () => {
          const response = await axios.post(`${baseURL}/game`, {
            data: 1,
          });
          if (ballManager) {
            ballManager.addBall(response.data.point);
          }
          await new Promise((resolve) => setTimeout(resolve, 5000));
          setBalance(response.data.updatedBalance);
        }}
      >
        Add ball
      </Button>
    </div>
    </div>
    <div className="flex justify-center text-red-500 text-xl mb-5">
        Note - Every ball cost 10 Rupees
      </div>
  </div>
  );
}
