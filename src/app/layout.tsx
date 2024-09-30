import { AnimatePresence } from "framer-motion"; // Import AnimatePresence
import "./globals.css";
import ReduxProvider from "../../redux/features/ReduxProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {/* AnimatePresence wraps the children for exit/enter animations */}
                <ReduxProvider>
                    <AnimatePresence mode="wait">{children}</AnimatePresence>
                </ReduxProvider>
            </body>
        </html>
    );
}
