import { useState } from "react";
import { Button, Form, FormControl, FormGroup } from "react-bootstrap";

const CommentForm = ({
    handleSubmit,
    initialText = "",
}) => {
    const [text, setText] = useState(initialText);
    const isTextareaDisabled = text.length === 0;
    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(text);
        setText("");
    };
    
    return (
        <Form>
            <FormGroup className="mb-3" controlId="comment">
                <FormControl as="textarea" rows={3} value={text} placeholder="Please Enter Your Comment"
                    type="text" onChange={(e) => setText(e.target.value)} >
                </FormControl>
            </FormGroup>
            <Button style={{ marginBlockEnd: "10px" }} disabled={isTextareaDisabled} onClick={onSubmit}>
                Send
            </Button>
        </Form>
    );
};

export default CommentForm;