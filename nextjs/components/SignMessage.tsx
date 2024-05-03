import { useState, useEffect } from "react";
import { useSignMessage } from "wagmi";
import { recoverMessageAddress } from "viem";

export default function SignMessage({ message }: { message: string }) {
  const {
    signMessage,
    isPending,
    isSuccess,
    isError,
    error,
    data: signMessageData,
    variables,
  } = useSignMessage();
  const [recoveredAddress, setRecoveredAddress] = useState("");

  useEffect(() => {
    const recoverAddress = async () => {
      if (variables?.message && signMessageData) {
        try {
          const address = await recoverMessageAddress({
            message: variables.message,
            signature: signMessageData,
          });
          setRecoveredAddress(address);
        } catch (err) {
          console.error("Error recovering address:", err);
        }
      }
    };

    if (isSuccess) {
      recoverAddress();
    }
  }, [variables, signMessageData, isSuccess]);

  const handleSignMessage = async () => {
    try {
      await signMessage({ message });
    } catch (err) {
      console.error("Error signing message:", err);
    }
  };

  return (
    <div className="text-center mt-4 w-full break-words">
      <button
        onClick={handleSignMessage}
        disabled={isPending || !!signMessageData}
        className="p-2 bg-blue-500 text-white disabled:opacity-50"
      >
        {isPending ? "Signing..." : "Sign Message"}
      </button>
      {isSuccess && (
        <div>
          <p className="break-all">Signature: {signMessageData}</p>
          <p className="break-all">Recovered Address: {recoveredAddress}</p>
        </div>
      )}
      {isError && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}
