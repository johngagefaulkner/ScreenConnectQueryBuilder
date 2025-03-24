'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

const propertyList = [
	"GuestNetworkAddress",
	"GuestMachineName",
	"GuestMachineDomain",
	"GuestProcessorName",
	"GuestProcessorVirtualCount",
	"GuestSystemMemoryTotalMegabytes",
	"GuestSystemMemoryAvailableMegabytes",
	"GuestScreenshotContentType",
	"GuestInfoUpdateTime",
	"GuestOperatingSystemManufacturerName",
	"GuestOperatingSystemLanguage",
	"GuestOperatingSystemInstallationTime",
	"GuestMachineManufacturerName",
	"GuestMachineModel",
	"GuestMachineProductNumber",
	"GuestMachineSerialNumber",
	"GuestMachineDescription",
	"GuestProcessorArchitecture",
	"GuestPrivateNetworkAddress",
	"GuestHardwareNetworkAddress",
	"GuestTimeZoneName",
	"GuestTimeZoneOffsetHours",
	"GuestLastBootTime",
];


export default function Home() {
	const [step, setStep] = useState(1);
	const [selectedProperty, setSelectedProperty] = useState("");
	const [inputList, setInputList] = useState("");
	const [resultQuery, setResultQuery] = useState("");
	const [copied, setCopied] = useState(false);

	const handleNext = () => {
		if (step === 2) {
			const items = inputList
				.split(/[\n,]+/)
				.map((x) => x.trim())
				.filter(Boolean);
			const query = items.map((item) => `${selectedProperty} LIKE '${item}'`).join(" OR ");
			setResultQuery(query);
		}
		setStep((prev) => prev + 1);
	};

	const handleBack = () => {
		if (step > 1) setStep((prev) => prev - 1);
	};

	const handleHome = () => {
		setStep(1);
		setSelectedProperty("");
		setInputList("");
		setResultQuery("");
		setCopied(false);
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(resultQuery);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<main className='w-screen h-screen flex items-center justify-center p-6 dark bg-gray-900 text-white'>
			<Card className='w-full max-w-3xl h-full max-h-[95vh] overflow-y-auto bg-gray-800 text-white'>
				<CardContent className='p-6'>
					<h1 className='text-2xl font-bold mb-6'>ScreenConnect Query Builder</h1>

					{step === 1 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}>
							<label className='block mb-2 font-medium'>Select a Property</label>
							<select
								className='w-full border px-4 py-2 rounded bg-gray-700 text-white'
								value={selectedProperty}
								onChange={(e) => setSelectedProperty(e.target.value)}>
								<option value=''>-- Select --</option>
								{propertyList.map((prop) => (
									<option
										key={prop}
										value={prop}>
										{prop}
									</option>
								))}
							</select>
							<div className='mt-4 flex gap-2'>
								<Button
									disabled={!selectedProperty}
									onClick={handleNext}>
									Next
								</Button>
							</div>
						</motion.div>
					)}

					{step === 2 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}>
							<label className='block mb-2 font-medium'>Enter list of values (comma or newline separated)</label>
							<Textarea
								className='w-full h-40 bg-gray-700 text-white'
								placeholder='e.g. ABC-D-123456, EFG-L-938474'
								value={inputList}
								onChange={(e) => setInputList(e.target.value)}
							/>
							<div className='mt-4 flex gap-2'>
								<Button
									variant='secondary'
									onClick={handleBack}>
									Back
								</Button>
								<Button
									disabled={!inputList.trim()}
									onClick={handleNext}>
									Next
								</Button>
							</div>
						</motion.div>
					)}

					{step === 3 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}>
							<label className='block mb-2 font-medium'>Generated Query</label>
							<Textarea
								className='w-full h-40 mb-4 bg-gray-700 text-white'
								value={resultQuery}
								readOnly
							/>
							<div className='flex flex-wrap gap-2'>
								<Button
									onClick={copyToClipboard}
									className={`flex items-center gap-2 transition-colors duration-300 ${
										copied ? "bg-green-500 hover:bg-green-600 text-white" : ""
									}`}>
									{copied ? <Check size={16} /> : <Copy size={16} />}
									{copied ? "Copied!" : "Copy to Clipboard"}
								</Button>
								<Button
									variant='secondary'
									onClick={handleBack}>
									Back
								</Button>
								<Button
									variant='ghost'
									onClick={handleHome}>
									Home
								</Button>
							</div>
						</motion.div>
					)}
				</CardContent>
			</Card>
		</main>
	);
}
