import { SimpleGrid, Stack } from "@chakra-ui/react"
import { IStatProps, Stat } from "../Stat/Stat"

export const Stats = ({ stats }: { stats: IStatProps[]}) => {
    return (
        <Stack spacing={{ base: "5", lg: "6" }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
            {stats.map((stat, i) => (
                <Stat key={i} label={stat.label} value={stat.value} />
            ))}
        </SimpleGrid>
      </Stack>

    )
}