export default function RankItem({item, position}){
    return (
        <tr class="border-b border-slate-600/50">
            <td class="table-td text-center font-bold">{position}</td>
            <td class="table-td text-center font-bold">{item.student_name}</td>
            <td class="table-td text-center font-bold">{item.markofQuiz}</td>
            <td class="table-td text-center font-bold">{item.markofAssignment}</td>
            <td class="table-td text-center font-bold">{item.totalMark}</td>
        </tr>
    )
}