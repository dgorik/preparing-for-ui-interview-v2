import {useState} from 'react'
import flex from '@course/styles'
import cx from '@course/cx'
import {useFileUpload} from '../49-use-file-upload/use-upload'
import {ProgressBar} from '../46-progress-bar/progress-bar.react.tsx'

/**
 * Expected behavior:
 * - "Select File" button triggers hidden file input
 * - On file select, upload starts automatically via useFileUpload hook
 * - Shows file name, speed, remaining time, progress bar
 * - Pause/Resume/Cancel buttons based on upload status
 * - "Upload Another" button after completion
 */

export const UploadComponent = () => {
    // Step 1: Hook & State — useFileUpload() for [uploadState, uploadControls] + useState<File|null> + fileInputRef

    // Step 2: Handlers:
    //   - handleFileChange: get file from input, setFile
    //   - Start/Pause/Resume/Cancel triggered directly via controls in JSX

    // Step 3: Render:
    //   - <input type="file"> for file selection
    //   - If not idle: show ProgressBar, speed, remaining time, uploaded bytes
    //   - Buttons: Upload (idle), Pause (uploading), Resume (paused), Cancel/Reset (not idle)

    return <div>TODO: Implement</div>
}
