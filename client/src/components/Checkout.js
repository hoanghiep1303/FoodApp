import { useState } from "react";
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import { UseContextProvider } from "../contexts/StepperContext";

import Account from "../steps/Account";
import Details from "../steps/Details";
import Payment from "../steps/Payment";
import Final from "../steps/Final";

const Checkout = () => {

    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        "Account Information",
        "Personal Details",
        "Payment",
        "Complete",
    ];

    const displayStep = (step) => {
        switch (step) {
            case 1:
                return <Account />;
            case 2:
                return <Details />;
            case 3:
                return <Payment />;
            case 4:
                return <Final />;
            default:
        }
    };

    const handleClick = (direction) => {
        let newStep = currentStep;

        direction === "next" ? newStep++ : newStep--;
        // check if steps are within bounds
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    };

    return (
        <div className="checkout-page py-5" style={{ backgroundColor: '#333' }}>
            <div className="mx-auto rounded-2xl bg-white py-2 shadow-xl md:w-1/2">
                {/* Stepper */}
                <div className="horizontal container">
                    <Stepper steps={steps} currentStep={currentStep} />

                    <div className="my-10 p-8 ">
                        <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
                    </div>
                </div>

                {/* navigation button */}
                {currentStep !== steps.length && (
                    <StepperControl
                        handleClick={handleClick}
                        currentStep={currentStep}
                        steps={steps}
                    />
                )}
            </div>
        </div>
    )
}

export default Checkout