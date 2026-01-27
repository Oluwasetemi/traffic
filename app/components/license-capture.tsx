"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogActions,
} from "./dialog";
import { Button } from "./button";
import { Select } from "./select";
import { Field, Label, Description } from "./fieldset";
import { CameraCapture } from "./camera-capture";
import { FileUpload } from "./file-upload";
import {
  QualityIndicator,
  FieldConfidenceIndicator,
} from "./quality-indicator";
import { useOCR } from "../hooks/use-ocr";
import type { ExtractedLicenseData, CaptureMode } from "../types/ocr";
import {
  CameraIcon,
  PhotoIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
  CheckIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

interface LicenseCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onDataExtracted: (data: ExtractedLicenseData) => void;
}

export function LicenseCapture({
  isOpen,
  onClose,
  onDataExtracted,
}: LicenseCaptureProps) {
  const [mode, setMode] = useState<CaptureMode>("camera");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [currentSide, setCurrentSide] = useState<"front" | "back">("front");
  const [frontData, setFrontData] = useState<ExtractedLicenseData | null>(null);

  const {
    processImage,
    reset,
    processingState,
    qualityResult,
    extractedData,
    isProcessing,
    error,
    currentEngine,
    setCurrentEngine,
  } = useOCR();

  const handleImageCapture = useCallback(
    async (imageSrc: string) => {
      setCapturedImage(imageSrc);
      await processImage(imageSrc, currentSide);
    },
    [processImage, currentSide],
  );

  const handleRetake = useCallback(() => {
    setCapturedImage(null);
    reset();
  }, [reset]);
  
  const handleClose = useCallback(() => {
    setCapturedImage(null);
    setCurrentSide("front");
    setFrontData(null);
    reset();
    onClose();
  }, [reset, onClose]);

  const handleUseData = useCallback(() => {
    if (currentSide === "front" && extractedData) {
      // Save front data and move to back
      setFrontData(extractedData);
      setCurrentSide("back");
      setCapturedImage(null);
      reset();
    } else if (currentSide === "back" && extractedData && frontData) {
      // Merge front and back data
      const mergedData: ExtractedLicenseData = {
        driversLicNo: frontData.driversLicNo || extractedData.driversLicNo,
        controlNo: extractedData.controlNo || frontData.controlNo,
        dateOfBirth: frontData.dateOfBirth || extractedData.dateOfBirth,
        origLicIssueDate:
          extractedData.origLicIssueDate || frontData.origLicIssueDate,
        confidence: {
          driversLicNo: frontData.confidence.driversLicNo,
          controlNo: extractedData.confidence.controlNo,
          dateOfBirth: frontData.confidence.dateOfBirth,
          origLicIssueDate:
            extractedData.confidence.origLicIssueDate ||
            frontData.confidence.origLicIssueDate,
        },
      };
      onDataExtracted(mergedData);
      handleClose();
    }
  }, [currentSide, extractedData, frontData, onDataExtracted, handleClose, reset]);

  const getProgressMessage = () => {
    switch (processingState.currentStep) {
      case "loading-worker":
        return "Initializing OCR engine...";
      case "preprocessing":
        return "Analyzing image quality...";
      case "extracting":
        return "Extracting text from license...";
      case "parsing":
        return "Parsing license data...";
      case "complete":
        return "Processing complete!";
      case "error":
        return "Processing failed";
      default:
        return "Processing...";
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} size="4xl">
      <DialogTitle>
        Scan Driver&apos;s License -{" "}
        {currentSide === "front" ? "FRONT" : "BACK"} Side
      </DialogTitle>
      <DialogDescription>
        {currentSide === "front"
          ? "Capture or upload a photo of the FRONT of your Jamaica driver's license (with your photo and license number)"
          : "Now capture or upload a photo of the BACK of your license (with the control number and original issue date)"}
      </DialogDescription>

      <DialogBody>
        {/* Info banner showing what to look for */}
        <div className="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20">
          <div className="flex gap-2">
            <InformationCircleIcon className="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <div className="text-sm text-blue-900 dark:text-blue-100">
              <p className="font-semibold mb-2">
                {currentSide === "front"
                  ? "Front Side Information:"
                  : "Back Side Information:"}
              </p>
              {currentSide === "front" ? (
                <ul className="space-y-1 text-xs">
                  <li>
                    <strong>TRN (License Number):</strong> 9-digit number
                    labeled &quot;TRN&quot;
                  </li>
                  <li>
                    <strong>Date of Birth:</strong> Located near &quot;EXPIRY DATE&quot;
                    and &quot;SEX&quot; fields
                  </li>
                  <li>
                    <strong>Date Issued:</strong> Look for &quot;DATE ISSUED&quot; label
                  </li>
                </ul>
              ) : (
                <ul className="space-y-1 text-xs">
                  <li>
                    <strong>Control Number:</strong> 10-digit number on the back
                  </li>
                  <li>
                    <strong>Original Date of Issue:</strong> Look for &quot;ORIGINAL
                    DATE OF ISSUE&quot; label
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        {/* OCR Engine Selector */}
        {!capturedImage && (
          <Field>
            <Label>OCR Engine</Label>
            <Select
              name="ocr-engine"
              value={currentEngine}
              onChange={(e) =>
                setCurrentEngine(e.target.value as typeof currentEngine)
              }
              disabled={isProcessing}
            >
              <option value="tesseract">Tesseract (Fast - Free)</option>
              {/*<option value="transformers">
                Transformers.js (AI Model - Free)
              </option>*/}
              <option value="claude">
                Claude Vision (Best Accuracy - Paid)
              </option>
              {/*<option value="auto">Auto (Try Best Available)</option>*/}
            </Select>
            <Description>
              {currentEngine === "tesseract" &&
                "Fast processing (~2-3 seconds). Good for clear images. Runs locally."}
              {currentEngine === "transformers" &&
                "AI model processing (~5-10 seconds). First use requires downloading model. Runs locally."}
              {currentEngine === "claude" &&
                "Claude Vision API - Highest accuracy with document understanding. Uses API credits (~$0.01 per scan)."}
              {currentEngine === "auto" &&
                "Automatically selects the best available engine. Tries Claude first if API key is configured."}
            </Description>
          </Field>
        )}

        {!capturedImage ? (
          <>
            {/* Mode selection tabs */}
            <div className="mb-6 flex space-x-2 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
              <button
                type="button"
                onClick={() => setMode("camera")}
                className={`flex flex-1 items-center justify-center space-x-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  mode === "camera"
                    ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                <CameraIcon className="h-5 w-5" />
                <span>Camera</span>
              </button>

              <button
                type="button"
                onClick={() => setMode("upload")}
                className={`flex flex-1 items-center justify-center space-x-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  mode === "upload"
                    ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                <PhotoIcon className="h-5 w-5" />
                <span>Upload</span>
              </button>

              <button
                type="button"
                onClick={() => setMode("drop")}
                className={`flex flex-1 items-center justify-center space-x-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  mode === "drop"
                    ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                <ArrowUpTrayIcon className="h-5 w-5" />
                <span>Drag & Drop</span>
              </button>
            </div>

            {/* Content based on mode */}
            {mode === "camera" && (
              <CameraCapture
                onCapture={handleImageCapture}
                disabled={isProcessing}
              />
            )}

            {(mode === "upload" || mode === "drop") && (
              <FileUpload
                onUpload={handleImageCapture}
                disabled={isProcessing}
              />
            )}
          </>
        ) : (
          <div className="space-y-4">
            {/* Captured image preview */}
            <div className="overflow-hidden rounded-lg border-2 border-zinc-200 dark:border-zinc-700">
              <img
                src={capturedImage}
                alt="Captured license"
                className="w-full"
              />
            </div>

            {/* Processing indicator */}
            {isProcessing && (
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20">
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 animate-spin motion-reduce:animate-none rounded-full border-2 border-blue-600 border-t-transparent dark:border-blue-400"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      {getProgressMessage()}
                    </p>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-blue-200 dark:bg-blue-900">
                      <div
                        className="h-full bg-blue-600 transition-all duration-300 dark:bg-blue-400"
                        style={{ width: `${processingState.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quality feedback */}
            {qualityResult && !isProcessing && (
              <QualityIndicator qualityResult={qualityResult} />
            )}

            {/* Error message */}
            {error && !isProcessing && (
              <div className="rounded-lg bg-red-50 p-4 dark:bg-red-950/20">
                <p className="text-sm font-medium text-red-900 dark:text-red-100">
                  {error}
                </p>
              </div>
            )}

            {/* Extracted data preview */}
            {extractedData && !isProcessing && (
              <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
                <h4 className="mb-3 text-sm font-semibold text-green-900 dark:text-green-100">
                  Extracted Information
                </h4>

                <div className="space-y-2">
                  {extractedData.driversLicNo && (
                    <div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        License Number
                      </p>
                      <p className="font-mono text-sm font-medium text-zinc-900 dark:text-white">
                        {extractedData.driversLicNo}
                      </p>
                      <FieldConfidenceIndicator
                        label="Confidence"
                        confidence={Math.round(
                          extractedData.confidence.driversLicNo,
                        )}
                        value={extractedData.driversLicNo}
                      />
                    </div>
                  )}

                  {extractedData.controlNo && (
                    <div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        Control Number
                      </p>
                      <p className="font-mono text-sm font-medium text-zinc-900 dark:text-white">
                        {extractedData.controlNo}
                      </p>
                      <FieldConfidenceIndicator
                        label="Confidence"
                        confidence={Math.round(
                          extractedData.confidence.controlNo,
                        )}
                        value={extractedData.controlNo}
                      />
                    </div>
                  )}

                  {extractedData.dateOfBirth && (
                    <div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        Date of Birth
                      </p>
                      <p className="font-mono text-sm font-medium text-zinc-900 dark:text-white">
                        {extractedData.dateOfBirth}
                      </p>
                      <FieldConfidenceIndicator
                        label="Confidence"
                        confidence={Math.round(
                          extractedData.confidence.dateOfBirth,
                        )}
                        value={extractedData.dateOfBirth}
                      />
                    </div>
                  )}

                  {extractedData.origLicIssueDate && (
                    <div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        License Issue Date
                      </p>
                      <p className="font-mono text-sm font-medium text-zinc-900 dark:text-white">
                        {extractedData.origLicIssueDate}
                      </p>
                      <FieldConfidenceIndicator
                        label="Confidence"
                        confidence={Math.round(
                          extractedData.confidence.origLicIssueDate,
                        )}
                        value={extractedData.origLicIssueDate}
                      />
                    </div>
                  )}
                </div>

                <p className="mt-3 text-xs text-green-800 dark:text-green-200">
                  Review the extracted data and make corrections if needed after
                  auto-filling the form.
                </p>
              </div>
            )}
          </div>
        )}
      </DialogBody>

      <DialogActions>
        {!capturedImage ? (
          <Button plain onClick={handleClose}>
            Cancel
          </Button>
        ) : (
          <>
            <Button plain onClick={handleRetake} disabled={isProcessing}>
              <XMarkIcon className="h-5 w-5" />
              Retake Photo
            </Button>

            {extractedData && !isProcessing && (
              <Button color="blue" onClick={handleUseData}>
                <CheckIcon className="h-5 w-5" />
                {currentSide === "front"
                  ? "Continue to Back Side"
                  : "Use This Data"}
              </Button>
            )}
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
