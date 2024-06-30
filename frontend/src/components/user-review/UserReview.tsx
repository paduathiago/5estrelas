import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import DialogAnswer from "@/components/dialog-answer/DialogAnswer";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Stars from "../stars/Stars";

function UserReview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <CardTitle className="text-3xl">Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Card Contentdasfasfdas fdsa fasf dsa as da fdas fsa dfa fdsafdasfdas
          fda da as fdas fads fas dfas fas fas fas fasd fs ad fads fdas fda
        </p>
      </CardContent>
      <CardFooter className="justify-between gap-2">
        <Stars score={5}></Stars>
        <div className="flex gap-2">
          {/* <Button variant="outline" className='gap-1'>
                        <MessageCircle />
                        Responder
                    </Button> */}
          <DialogAnswer></DialogAnswer>

          <Button variant="outline" size="icon">
            <ThumbsUp />
          </Button>

          <Button variant="outline" size="icon">
            <ThumbsDown />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default UserReview;
