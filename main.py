import os

import logging

logging.basicConfig(filename="/tmp/template.log",
                    format='[template] %(asctime)s %(levelname)s %(message)s',
                    filemode='w+',
                    force=True)
logger=logging.getLogger()
logger.setLevel(logging.INFO)

class Plugin:


    def level_0():
        return """
        control=mangohud
        fsr_steam_sharpness=5
        nis_steam_sharpness=10
        no_display
        """

    def level_1():
        return """
        control=mangohud
        fsr_steam_sharpness=5
        nis_steam_sharpness=10
        frame_timing=0
        cpu_stats=0
        gpu_stats=0
        fps=1
        fps_only
        legacy_layout=0
        width=40
        frametime=0
        """

    def level_2():
        return """
        control=mangohud
        fsr_steam_sharpness=5
        nis_steam_sharpness=10
        legacy_layout=0
        horizontal
        battery
        gpu_stats
        cpu_stats
        cpu_power
        gpu_power
        ram
        fps
        frametime=0
        hud_no_margin
        table_columns=15
        frame_timing=1
        time
        time_format=%T
        """

    def level_3():
        return """
        mangoapp_steam
        fsr_steam_sharpness=5
        nis_steam_sharpness=10
        cpu_temp
        gpu_temp
        ram
        vram
        io_read
        io_write
        arch
        gpu_name
        cpu_power
        gpu_power
        wine
        frametime
        battery
        time
        time_format=%T%t%a %e %b %Y
        """

    def level_4():
        return """
        control=mangohud
        fsr_steam_sharpness=5
        nis_steam_sharpness=10
        cpu_temp
        gpu_temp
        ram
        vram
        io_read
        io_write
        arch
        gpu_name
        cpu_power
        gpu_power
        wine
        frametime
        battery
        time
        """


    def get_mango_config_path():
        returned_file_ts = 0
        returned_file = ""
        possible_files = filter(lambda f: f.startswith("mangohud."), os.listdir("/tmp"))
        for current_file in possible_files:
            current_file_path = "/tmp/" + current_file
            current_file_ts = os.path.getctime(current_file_path)
            if returned_file_ts < current_file_ts:
                returned_file_ts = current_file_ts
                returned_file = current_file_path
        return returned_file

    def predefined(self, level):
        if level == 0:
            return self.level_0()
        if level == 1:
            return self.level_1()
        if level == 2:
            return self.level_2()
        if level == 3:
            return self.level_3()
        if level == 4:
            return self.level_4()

    async def _main(self):
        logger.info("MangoEditor started")

    async def save(self, config):
        logger.info("save called")
        f = open(self.get_mango_config_path(), "w")
        f.write(config)
        f.close()
        return config

    async def load(self, level = False):
        if level:
            logger.info("load called with level: " + str(level))
            return self.predefined(self, level)
        logger.info("load called")
        f = open(self.get_mango_config_path(), "r")
        content = f.read()
        f.close()
        return content
