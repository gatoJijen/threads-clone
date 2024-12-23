
export default function LoadingMain() {
    return (
        <section className="flex flex-col z-40 justify-between py-5 h-svh w-full items-center">
            <article></article>
            <article className="mt-11">
                <svg id="barcelona-splash-screen-logo" width="81" height="93" viewBox="0 0 81 93" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M41.2132 93H41.1866C27.4123 92.9062 16.8231 88.3313 9.70816 79.399C3.37458 71.4514 0.109716 60.3924 0 46.5335V46.4665C0.109716 32.6043 3.37458 21.5486 9.70816 13.601C16.8231 4.66876 27.4123 0.093777 41.1866 0H41.2132H41.2397C51.799 0.0703328 60.6328 2.80661 67.4983 8.12511C73.9516 13.1254 78.4932 20.2525 81 29.312L73.1537 31.5158C68.908 16.1732 58.1625 8.32941 41.2132 8.20549C30.0222 8.28587 21.5608 11.8293 16.0584 18.7353C10.9051 25.2026 8.24197 34.5434 8.14555 46.4967C8.24529 58.4532 10.9084 67.7941 16.0584 74.258C21.5608 81.164 30.0222 84.7074 41.2132 84.7878C51.3003 84.7141 57.9764 82.3463 63.5286 76.867C69.8655 70.6141 69.7492 62.9445 67.7211 58.2791C66.5275 55.5294 64.3598 53.2385 61.4374 51.5037C60.7026 56.7351 59.0502 60.9819 56.4969 64.1803C53.0924 68.4505 48.2649 70.7849 42.154 71.1165C37.5294 71.3677 33.0743 70.2658 29.6166 68.0118C25.5272 65.3458 23.1334 61.2665 22.8774 56.5241C22.628 51.9123 24.4433 47.6722 27.9874 44.5843C31.3753 41.6336 36.1396 39.9021 41.7684 39.5839C45.9176 39.3495 49.7976 39.5337 53.3849 40.1366C52.9095 37.2596 51.9453 34.9788 50.509 33.331C48.5342 31.0636 45.4788 29.9048 41.4326 29.878C41.396 29.878 41.3594 29.878 41.3195 29.878C38.0713 29.878 33.6594 30.7756 30.8467 34.9889L24.0875 30.4105C27.8511 24.7739 33.9653 21.6725 41.3162 21.6725C41.3727 21.6725 41.4259 21.6725 41.4825 21.6725C53.7739 21.7496 61.0916 29.3221 61.8197 42.548C62.2386 42.7255 62.6476 42.9097 63.0532 43.1006C68.7883 45.8168 72.9808 49.9296 75.1818 54.9935C78.2471 62.0536 78.5297 73.558 69.2239 82.7348C62.1156 89.7479 53.4847 92.9129 41.2397 92.9967H41.2132V93ZM45.0698 47.6957C44.1389 47.6957 43.1947 47.7225 42.2305 47.7794C35.1655 48.1813 30.7636 51.44 31.0129 56.082C31.2756 60.945 36.6018 63.2057 41.7185 62.9277C46.4296 62.6732 52.5604 60.8278 53.5877 48.5497C50.9878 47.9904 48.1286 47.6957 45.0698 47.6957Z">
                    </path>
                </svg>
            </article>
            <footer className="flex justify-self-end">
                <svg id="barcelona-splash-screen-from-meta" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1374.13 894.73" width="106" height="69">
                    <g fill="white">
                        <path d="M556.85,506.34h37.12l63.12,114.17,63.12-114.17h36.32v187.61h-30.29v-143.79l-55.34,99.57h-28.41l-55.34-99.57v143.79h-30.29v-187.61Z"></path>
                        <path d="M854.2,697.3c-14.03,0-26.35-3.11-36.99-9.31-10.63-6.21-18.92-14.81-24.86-25.8-5.94-10.99-8.91-23.58-8.91-37.79s2.9-27.11,8.71-38.19c5.81-11.08,13.87-19.74,24.19-26,10.32-6.25,22.18-9.38,35.58-9.38s24.77,3.15,34.37,9.45c9.6,6.3,17,15.12,22.18,26.47,5.18,11.35,7.77,24.66,7.77,39.93v8.31h-102.78c1.88,11.44,6.5,20.44,13.87,27,7.37,6.57,16.68,9.85,27.94,9.85,9.02,0,16.79-1.34,23.32-4.02,6.52-2.68,12.64-6.74,18.36-12.19l16.08,19.7c-15.99,14.65-35.6,21.98-58.83,21.98ZM876.32,586.01c-6.34-6.48-14.65-9.72-24.92-9.72s-18.38,3.31-25.13,9.92c-6.75,6.61-11.01,15.5-12.8,26.67h73.7c-.89-11.44-4.51-20.39-10.85-26.87Z"></path><path d="M952.97,578.97h-27.87v-24.79h27.87v-41.01h29.21v41.01h42.35v24.79h-42.35v62.85c0,10.45,1.79,17.91,5.36,22.38,3.57,4.47,9.69,6.7,18.36,6.7,3.84,0,7.1-.15,9.78-.47,2.68-.31,5.63-.74,8.84-1.27v24.52c-3.31.98-7.03,1.79-11.19,2.41-4.15.62-8.51.94-13.07.94-31.54,0-47.3-17.24-47.3-51.73v-66.33Z">
                        </path>
                        <path d="M1176.76,693.95h-28.68v-19.56c-5.09,7.33-11.57,12.98-19.43,16.95-7.86,3.97-16.8,5.96-26.8,5.96-12.33,0-23.25-3.15-32.76-9.45-9.51-6.3-17-14.96-22.45-26-5.45-11.03-8.17-23.65-8.17-37.86s2.77-26.94,8.31-37.92c5.54-10.99,13.2-19.61,22.98-25.86,9.78-6.25,21.02-9.38,33.7-9.38,9.56,0,18.13,1.86,25.73,5.56,7.59,3.71,13.89,8.96,18.89,15.74v-17.96h28.68v139.77ZM1147.55,603.09c-3.13-7.95-8.06-14.23-14.81-18.83-6.75-4.6-14.54-6.9-23.38-6.9-12.51,0-22.47,4.2-29.88,12.6-7.42,8.4-11.12,19.74-11.12,34.04s3.57,25.77,10.72,34.17c7.15,8.4,16.84,12.6,29.08,12.6,9.02,0,17.06-2.32,24.12-6.97,7.06-4.64,12.15-10.9,15.28-18.76v-41.94Z">
                        </path>
                    </g>
                    <path fill="white" d="M410.52,500c-24.35,0-43.39,18.34-60.62,41.64-23.68-30.15-43.49-41.64-67.19-41.64-48.32,0-85.34,62.88-85.34,129.44,0,41.65,20.15,67.92,53.9,67.92,24.29,0,41.76-11.45,72.82-65.74,0,0,12.95-22.86,21.85-38.61,3.12,5.04,6.4,10.46,9.86,16.29l14.56,24.5c28.37,47.48,44.18,63.57,72.82,63.57,32.88,0,51.18-26.63,51.18-69.15,0-69.69-37.86-128.22-83.85-128.22ZM300.4,616.92c-25.18,39.47-33.89,48.32-47.91,48.32s-23-12.67-23-35.25c0-48.32,24.09-97.73,52.81-97.73,15.55,0,28.55,8.98,48.46,37.48-18.9,29-30.35,47.18-30.35,47.18ZM395.44,611.95l-17.41-29.04c-4.71-7.66-9.23-14.71-13.59-21.16,15.69-24.22,28.64-36.29,44.04-36.29,31.99,0,57.58,47.1,57.58,104.94,0,22.05-7.22,34.85-22.19,34.85s-21.19-9.47-48.43-53.29Z">
                    </path>
                    <g fill="#63798C">
                        <path d="M505.34,339.98v-82.57h-18v-13.18h18v-12.03c0-11.35,2.89-20,8.66-25.93,5.77-5.93,13.76-8.9,23.96-8.9,6.03,0,11.32.67,15.88,2.02v13.57c-2.63-.71-5.05-1.19-7.27-1.44-2.21-.26-4.38-.38-6.5-.38-13.02,0-19.53,6.67-19.53,20.01v13.09h32.62v13.18h-32.62v82.57h-15.2Z">
                        </path>
                        <path d="M574.53,339.98v-95.75h15.2v16.65c3.01-6.03,6.87-10.66,11.55-13.9,4.68-3.24,10.1-4.86,16.26-4.86,2.95,0,5.77.29,8.47.87v15.21c-1.48-.19-3.06-.35-4.76-.48-1.7-.13-3.35-.19-4.96-.19-6.99,0-12.65,2.13-16.98,6.4-4.33,4.27-7.52,9.96-9.58,17.08v58.99h-15.2Z">
                        </path>
                        <path d="M685.28,342.1c-9.56,0-17.84-2.15-24.83-6.45-6.99-4.3-12.4-10.2-16.21-17.71-3.82-7.51-5.73-16.1-5.73-25.79s1.91-18.38,5.73-25.89c3.82-7.51,9.22-13.41,16.21-17.71,6.99-4.3,15.27-6.45,24.83-6.45h1.93c9.56,0,17.83,2.15,24.83,6.45,6.99,4.3,12.4,10.2,16.21,17.71,3.82,7.51,5.73,16.14,5.73,25.89s-1.91,18.28-5.73,25.79c-3.82,7.51-9.22,13.41-16.21,17.71-6.99,4.3-15.27,6.45-24.83,6.45h-1.93ZM685.38,328.05h1.73c9.56,0,17.13-3.27,22.71-9.82,5.58-6.54,8.37-15.24,8.37-26.08s-2.79-19.61-8.37-26.13c-5.58-6.51-13.15-9.77-22.71-9.77h-1.73c-9.56,0-17.13,3.26-22.71,9.77-5.58,6.51-8.37,15.22-8.37,26.13s2.79,19.53,8.37,26.08c5.58,6.54,13.15,9.82,22.71,9.82Z">
                        </path>
                        <path d="M756.01,339.98v-95.75h15.2v17.8c3.46-6.16,7.89-11.02,13.28-14.58,5.39-3.56,11.64-5.34,18.76-5.34h1.93c15.91,0,26.14,7.64,30.7,22.9,3.66-7.06,8.42-12.64,14.29-16.74,5.87-4.11,12.62-6.16,20.26-6.16h2.02c10.78,0,19,3.61,24.68,10.83,5.68,7.22,8.52,17.53,8.52,30.94v56.1h-15.2v-53.89c0-19.89-7.28-29.83-21.84-29.83h-1.73c-6.87,0-12.77,2.28-17.71,6.83-4.94,4.56-8.53,10.33-10.78,17.32v59.57h-15.2v-53.89c0-19.89-7.25-29.83-21.75-29.83h-1.83c-6.87,0-12.75,2.28-17.66,6.83-4.91,4.56-8.49,10.33-10.73,17.32v59.57h-15.2Z">
                        </path>
                    </g>
                </svg>
            </footer>
        </section>
    )
}