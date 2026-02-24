import { HeaderNavigation } from "@/components/miscellaneous/HeaderNavigation";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CodeInputCard from "./components/CodeInputCard";
import RecoveryPasswordForm, {
  RecoveryPasswordInputs,
} from "./components/RecoveryPasswordForm";

export function RecoveryPassword() {
  const RESEND_CODE_TIMER = 59;

  const [wasCodeSent, setWasCodeSent] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [code, setCode] = useState("");
  const [resendCodeTimer, setResendCodeTimer] = useState(RESEND_CODE_TIMER);
  const [ableToResendCode, setAbleToResendCode] = useState(false);

  const navigate = useNavigate();

  const handleSendConfirmationCode = (data: RecoveryPasswordInputs) => {
    console.log(data);
    setWasCodeSent(true);
  };

  const handleResendCode = () => {
    setAbleToResendCode(false);
    setResendCodeTimer(RESEND_CODE_TIMER);
  };

  //TODO-PABLO: Implement function to send recovery password
  const API_CODE = "123456";

  const checkCode = useCallback(() => {
    if (code === API_CODE) {
      setIsCodeValid(true);
    } else {
      setIsCodeValid(false);
    }
  }, [code]);

  useEffect(() => {
    checkCode();
  }, [checkCode, isCodeValid]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (resendCodeTimer <= 60 && resendCodeTimer >= 1) {
        setResendCodeTimer(resendCodeTimer - 1);
      } else {
        setResendCodeTimer(0);
        setAbleToResendCode(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCodeTimer]);

  useEffect(() => {
    if (isCodeValid) {
      navigate("/redefinir-senha");
    }
  }, [isCodeValid, navigate]);

  return (
    <div className="flex flex-col lg:mt-[8vh] mt-[4vh]">
      <div className="flex flex-row mb-2 w-full sm:w-[400px] ml-8 sm:mx-auto">
        <HeaderNavigation screenTitle="Recuperação de senha" />
      </div>
      {wasCodeSent ? (
        <CodeInputCard
          code={code}
          onChangeCode={(val) => setCode(val)}
          emailAddress="johndoe@gmail.com"
          isInvalidCode={wasCodeSent && !isCodeValid}
          onResendCode={handleResendCode}
          timeToResendCode={resendCodeTimer}
          ableToResendCode={ableToResendCode}
        />
      ) : (
        <RecoveryPasswordForm onSubmit={handleSendConfirmationCode} />
      )}
    </div>
  );
}
