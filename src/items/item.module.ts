import { Module } from "@nestjs/common";

// Controllers
import { FindItemController } from "./controllers/finditem.controller";
import { CreateItemController } from "./controllers/create.controller";
import { DeleteItemController } from "./controllers/delete.controller";
import { UpdateItemController } from "./controllers/update.controller";
import { FindAllPaginationItemController } from "./controllers/findallpagination.controller";
import { FindAllItemController } from "./controllers/findall.controller";
import { CreateItemFileController } from "./controllers/createbyfile.controller";
import { DownloadTemplateController } from "./controllers/downloadtemplate.controller";

// Services
import { ItemService } from "./item.service";

@Module({
    controllers: [
        FindItemController,
        FindAllItemController,
        FindAllPaginationItemController,
        CreateItemController,
        CreateItemFileController,
        UpdateItemController,
        DeleteItemController,
        DownloadTemplateController
    ],
    providers: [ItemService],
})
export class ItemModule {}