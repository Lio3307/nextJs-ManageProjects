import Link from "next/link";
import { Card, CardContent, CardTitle } from "./ui/card";
import { buttonVariants } from "./ui/button";
import { motion } from "motion/react";

export default function LogedIn() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center"
    >
      <Card>
        <CardContent className="p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
          >
            <CardTitle className="mb-4 text-center">You are already signed in</CardTitle>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                className={buttonVariants()} 
                href={"/dashboard"}
              >
                Back to Dashboard
              </Link>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
