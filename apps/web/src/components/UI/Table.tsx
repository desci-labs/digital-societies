import { HTMLProps } from "react";

export function Table(props: HTMLProps<HTMLTableElement>) {

  return (
    <table className="table-auto rounded-2xl w-full min-w-500 text-regent-gray text-center ">
      {props.children}
    </table>
  );
}

export function THead(props: { rows: string[], className?: string }) {
  return (
    <thead className={props.className}>
      <tr className="bg-neutrals-gray-7 dark:bg-primary dark:bg-opacity-10 text-tint-primary text-left tracking-wide">
        {props.rows.map((cell, i) => <Cell key={i} className="px-2 py-1 font-semibold text-sm font-lg capitalize">{cell}</Cell>)}
      </tr>
    </thead>
  );
}

export function TBody(props: HTMLProps<HTMLTableSectionElement>) {
  return (
    <tbody {...props} className="text-white">
       {props.children}
    </tbody>
  );
}

export function Row(props: HTMLProps<HTMLTableRowElement>) {
  return (
    <tr {...props} className={`border-b border-neutrals-gray-5 hover:bg-neutrals-gray-3 table-row text-md text-left font-normal ${props.className ?? ''}`}>
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
