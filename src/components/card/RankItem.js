export default function RankItem({item, position}){
    return (
        <tr className="border-b border-slate-600/50">
            <td className="table-td text-center font-bold">{position}</td>
            <td className="table-td text-center font-bold">{item.student_name}</td>
            <td className="table-td text-center font-bold">{item.markofQuiz}</td>
            <td className="table-td text-center font-bold">{item.markofAssignment}</td>
            <td className="table-td text-center font-bold">{item.totalMark}</td>
        </tr>
    )
}