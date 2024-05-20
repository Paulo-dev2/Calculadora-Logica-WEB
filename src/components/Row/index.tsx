import { ReactNode } from "react";

interface RowProps {
    children: ReactNode;
}

export const Row = ({ children }: RowProps) => {
    return (
        <div style={{ display: "flex", flexDirection: "row", marginTop: "5%"}}>
            {children}
        </div>
    );
};
