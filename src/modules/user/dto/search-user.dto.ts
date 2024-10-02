import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { PaginationType } from "src/models/pagination.type";

class PaginationDto implements PaginationType {
    @IsNotEmpty()
    @IsNumber({}, {
        message: "Number field must be a number!"
    })
    pageNumber: number;

    @IsNotEmpty()
    @IsNumber({}, {
        message: "Number field must be a number!"
    })
    pageSize: number;

    @IsString({
        message:"Search must be a string"
    })
    search: string;
}

export class SearchUserDto {
    @IsNotEmpty({
        message: "Pagination field must not empty !"
    })
    @ValidateNested()
    @Type(()=> PaginationDto)
    pagination: PaginationType
}
