import { ApiProperty } from "@nestjs/swagger";

export class tokensDto {

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4NjQ4YWRiNS05MzQ3LTQwMzItYmI1Ni0wNTRmNzc3Y2M5NTkiLCJlbWFpbCI6Im1hbmFyYmVrMHZ2YkBtYWlsLnJ1IiwiaWF0IjoxNzQ4OTY5NTMyLCJleHAiOjE3NTE1NjE1MzJ9.eYAfaF0vSCY77KPM2nxr5DZtqm1yHm0gyav97o0P74Q' })
    accessToken: string;

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4NjQ4YWRiNS05MzQ3LTQwMzItYmI1Ni0wNTRmNzc3Y2M5NTkiLCJlbWFpbCI6Im1hbmFyYmVrMHZ2YkBtYWlsLnJ1IiwiaWF0IjoxNzQ4OTY5NTMyLCJleHAiOjE3NTE1NjE1MzJ9.eYAfaF0vSCY77KPM2nxr5DZtqm1yHm0gyav97o0P74Q' })
    refreshToken: string;
}