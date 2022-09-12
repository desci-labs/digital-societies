import { HTMLProps } from "react";

export function Table(props: HTMLProps<HTMLTableElement>) {

  return (
    <table className="table-auto rounded-2xl w-full min-w-500 text-regent-gray text-center shadow-dark-inset">
      {props.children}
    </table>
  );
}

export function THead(props: { rows: string[], className?: string }) {
  return (
    <thead className={props.className}>
      <tr className="border-b border-aqua-haze text-dark text-left">
        {props.rows.map((cell, i) => <Cell key={i} className="px-2 py-1 font-semibold font-lg capitalize">{cell}</Cell>)}
      </tr>
    </thead>
  );
}

export function TBody(props: HTMLProps<HTMLTableSectionElement>) {
  return (
    <tbody {...props}>
       {props.children}
    </tbody>
  );
}

export function Row(props: HTMLProps<HTMLTableRowElement>) {
  return (
    <tr {...props} className={`border-b border-aqua-haze text-md text-left font-normal ${props.className ?? ''}`}>
      {props.children}
    </tr>
  )
}

export function Cell(props: HTMLProps<HTMLTableCellElement>) {
  return (
    <td {...props} className={`py-2 px-2 ${props.className || ''}`}>
      {props.children}
    </td>
  )
}
